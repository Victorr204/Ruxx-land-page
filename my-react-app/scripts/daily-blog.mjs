#!/usr/bin/env node

/**
 * Daily Blog Scheduler
 * Generates 1 article per day with web research
 * 
 * Usage:
 *   node scripts/daily-blog.mjs                    # Run now
 *   node scripts/daily-blog.mjs --schedule         # Set up Windows Task Scheduler
 *   node scripts/daily-blog.mjs --remove           # Remove scheduled task
 *   node scripts/daily-blog.mjs --status           # Check task status
 *   node scripts/daily-blog.mjs --time "08:00"     # Set custom time (default: 08:00)
 */

import { execSync } from "child_process";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createInterface } from "readline";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const LOG_DIR = join(ROOT, "scripts", "logs");
const STATE_FILE = join(ROOT, "scripts", "daily-state.json");

// ─── STATE MANAGEMENT ────────────────────────────────────

function loadState() {
  if (existsSync(STATE_FILE)) {
    return JSON.parse(readFileSync(STATE_FILE, "utf8"));
  }
  return { lastRun: null, totalArticles: 0, topicsUsed: [] };
}

function saveState(state) {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + "\n");
}

function logRun(article, topic) {
  const state = loadState();
  state.lastRun = new Date().toISOString();
  state.totalArticles++;
  state.topicsUsed.push({
    topic: topic,
    slug: article.slug,
    date: article.date,
  });
  // Keep last 50 entries
  if (state.topicsUsed.length > 50) {
    state.topicsUsed = state.topicsUsed.slice(-50);
  }
  saveState(state);
}

// ─── LOGGING ─────────────────────────────────────────────

function logToFile(message) {
  if (!existsSync(LOG_DIR)) {
    mkdirSync(LOG_DIR, { recursive: true });
  }
  const date = new Date().toISOString().split("T")[0];
  const logFile = join(LOG_DIR, `${date}.log`);
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${message}\n`;

  if (existsSync(logFile)) {
    const existing = readFileSync(logFile, "utf8");
    writeFileSync(logFile, existing + line);
  } else {
    writeFileSync(logFile, line);
  }
}

// ─── SCHEDULER (Windows Task Scheduler) ──────────────────

function setupSchedule(time = "08:00") {
  const scriptPath = join(__dirname, "daily-blog.mjs").replace(/\\/g, "\\\\");
  const nodePath = process.execPath;
  const logPath = join(LOG_DIR, "scheduled.log").replace(/\\/g, "\\\\");

  // Create batch file for scheduled run
  const batchContent = `@echo off
echo [%date% %time%] Starting daily blog generation... >> "${logPath}"
cd /d "${ROOT}"
"${nodePath}" "${scriptPath}" >> "${logPath}" 2>&1
echo [%date% %time%] Completed. >> "${logPath}"
`;

  const batchPath = join(__dirname, "run-daily.bat");
  writeFileSync(batchPath, batchContent);

  // Create scheduled task via PowerShell
  const taskName = "RuxxDailyBlog";
  const [hour, minute] = time.split(":");

  const psCommand = `
$taskName = "${taskName}"
$existing = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($existing) { Unregister-ScheduledTask -TaskName $taskName -Confirm:$false }

$action = New-ScheduledTaskAction -Execute "cmd.exe" -Argument "/c \\"${batchPath}\\""
$trigger = New-ScheduledTaskTrigger -Daily -At "${time}"
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -DontStopOnIdleEnd -AllowStartIfOnBatteries
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Description "Ruxx Blog: Generate 1 article daily" -Force
Write-Host "✅ Scheduled task '$taskName' created (runs daily at ${time})"
`;

  try {
    execSync(`powershell -Command "${psCommand.replace(/"/g, '\\"')}"`, {
      stdio: "inherit",
    });
    console.log(`\n  📅 Daily blog scheduled at ${time} every day`);
    console.log(`  📝 Log: ${logPath}`);
    console.log(`  🔄 To change time: node scripts/daily-blog.mjs --time "14:00"`);
    console.log(`  🗑️  To remove: node scripts/daily-blog.mjs --remove\n`);
  } catch (err) {
    console.error("\n  ❌ Failed to create scheduled task:", err.message);
    console.log("  💡 Run as Administrator or set up manually in Task Scheduler.\n");
    console.log("  Manual setup:");
    console.log(`    1. Open Task Scheduler`);
    console.log(`    2. Create Basic Task → "RuxxDailyBlog"`);
    console.log(`    3. Trigger: Daily at ${time}`);
    console.log(`    4. Action: Start Program → cmd.exe`);
    console.log(`    5. Arguments: /c "${batchPath}"\n`);
  }
}

function removeSchedule() {
  try {
    execSync('powershell -Command "Unregister-ScheduledTask -TaskName RuxxDailyBlog -Confirm:$false -ErrorAction SilentlyContinue"', {
      stdio: "pipe",
    });
    console.log("  ✅ Scheduled task removed.");
  } catch {
    console.log("  ℹ️  No scheduled task found.");
  }
}

function checkStatus() {
  try {
    const result = execSync(
      'powershell -Command "Get-ScheduledTask -TaskName RuxxDailyBlog -ErrorAction SilentlyContinue | Select-Object TaskName, State, @{N=\'LastRun\';E={$_.Info.LastRunTime}}, @{N=\'NextRun\';E={$_.Info.NextRunTime}} | Format-List"',
      { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }
    );
    if (result.trim()) {
      console.log("\n  📅 Scheduled Task Status:\n");
      console.log(result);
    } else {
      console.log("  ℹ️  No scheduled task found. Run with --schedule to set up.");
    }
  } catch {
    console.log("  ℹ️  No scheduled task found.");
  }
}

// ─── DAILY GENERATION ────────────────────────────────────

async function runDailyGeneration() {
  const startTime = Date.now();
  const state = loadState();

  console.log("");
  console.log("  ╔══════════════════════════════════════════════════╗");
  console.log("  ║   📅  Daily Blog Generation                     ║");
  console.log("  ╚══════════════════════════════════════════════════╝");
  console.log("");

  if (state.lastRun) {
    const last = new Date(state.lastRun);
    const now = new Date();
    const daysSince = Math.floor((now - last) / (1000 * 60 * 60 * 24));
    console.log(`  📊 Last run: ${state.lastRun} (${daysSince} days ago)`);
    console.log(`  📝 Total articles: ${state.totalArticles}`);
  }

  logRun({ slug: "start", date: new Date().toISOString().split("T")[0] }, "daily-run-start");

  // Run the blog generator
  console.log("\n  🚀 Starting article generation...\n");

  try {
    const scriptPath = join(__dirname, "ai-blog.mjs");
    const result = execSync(`node "${scriptPath}" --no-web`, {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
      timeout: 120000,
    });

    console.log(result);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    logToFile(`Daily generation completed in ${elapsed}s`);
    logRun(
      { slug: "daily-" + Date.now(), date: new Date().toISOString().split("T")[0] },
      "auto-daily"
    );

    console.log(`\n  ⏱️  Total time: ${elapsed}s`);
  } catch (err) {
    const errorMsg = err.message || "Unknown error";
    console.error(`  ❌ Generation failed: ${errorMsg}`);
    logToFile(`Daily generation FAILED: ${errorMsg}`);
  }
}

// ─── ARGUMENTS ───────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    schedule: false,
    remove: false,
    status: false,
    time: "08:00",
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--schedule":
        opts.schedule = true;
        break;
      case "--remove":
        opts.remove = true;
        break;
      case "--status":
        opts.status = true;
        break;
      case "--time":
        opts.time = args[++i] || "08:00";
        break;
    }
  }
  return opts;
}

// ─── MAIN ────────────────────────────────────────────────

async function main() {
  const opts = parseArgs();

  if (opts.schedule) {
    setupSchedule(opts.time);
    return;
  }

  if (opts.remove) {
    removeSchedule();
    return;
  }

  if (opts.status) {
    checkStatus();
    return;
  }

  await runDailyGeneration();
}

main().catch((err) => {
  console.error("\n  ❌ Fatal error:", err.message);
  process.exit(1);
});
