#!/usr/bin/env node

/**
 * Ruxx AI Blog Engine — Custom Content Generator
 * No 3rd party AI. Pure Node.js with web scraping + smart templates.
 *
 * Usage:
 *   node scripts/ai-blog.mjs                          # Auto-generate 1 article
 *   node scripts/ai-blog.mjs --topic "gift cards"     # Specific topic
 *   node scripts/ai-blog.mjs --count 3                # Generate 3 articles
 *   node scripts/ai-blog.mjs --list-topics            # Show available topics
 *   node scripts/ai-blog.mjs --no-web                 # Skip web scraping
 *   node scripts/ai-blog.mjs --dry-run                # Preview without saving
 *   node scripts/ai-blog.mjs --interactive            # Interactive mode
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createInterface } from "readline";

import { researchTopics, buildContext, buildArticle, TOPIC_DATABASE } from "./engine/generator.mjs";
import { getRandomStats } from "./engine/scraper.mjs";
import { generateOGImage } from "./engine/og-image.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ARTICLES_PATH = join(ROOT, "src", "lib", "articles.js");

// ─── ARGUMENTS ───────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    topic: null,
    count: 1,
    dryRun: false,
    listTopics: false,
    interactive: false,
    noWeb: false,
    specific: false,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--topic":
        opts.topic = args[++i];
        opts.specific = true;
        break;
      case "--count":
        opts.count = parseInt(args[++i]) || 1;
        break;
      case "--dry-run":
        opts.dryRun = true;
        break;
      case "--list-topics":
        opts.listTopics = true;
        break;
      case "--interactive":
      case "-i":
        opts.interactive = true;
        break;
      case "--no-web":
        opts.noWeb = true;
        break;
    }
  }
  return opts;
}

// ─── ARTICLE PUBLISHER ───────────────────────────────────

function formatArticleForJS(article) {
  // Escape backticks and dollar signs in content
  const safeContent = article.content
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");

  return `  {
    slug: "${article.slug}",
    title: "${article.title.replace(/"/g, '\\"')}",
    excerpt: "${article.excerpt.replace(/"/g, '\\"')}",
    date: "${article.date}",
    readTime: "${article.readTime}",
    category: "${article.category}",
    image: "/og/blog/${article.slug}.png",
    content: \`${safeContent}\`,
  },`;
}

function publishArticle(article) {
  if (!existsSync(ARTICLES_PATH)) {
    console.error(`\n  ❌ ${ARTICLES_PATH} not found`);
    return false;
  }

  const fileContent = readFileSync(ARTICLES_PATH, "utf8");
  const articleJS = formatArticleForJS(article);

  // Check for duplicate slug
  if (fileContent.includes(`slug: "${article.slug}"`)) {
    console.log(`  ⚠️  Article "${article.slug}" already exists. Generating new variant...`);
    return false;
  }

  // Insert before closing ];
  const insertionPoint = fileContent.lastIndexOf("];");
  if (insertionPoint === -1) {
    console.error("  ❌ Could not find end of articles array");
    return false;
  }

  const updated =
    fileContent.slice(0, insertionPoint) +
    articleJS +
    "\n" +
    fileContent.slice(insertionPoint);

  writeFileSync(ARTICLES_PATH, updated, "utf8");
  return true;
}

// ─── DISPLAY ─────────────────────────────────────────────

function printBanner() {
  console.log("");
  console.log("  ╔══════════════════════════════════════════════════╗");
  console.log("  ║   🧠  Ruxx AI Blog Engine  (Custom — No API)    ║");
  console.log("  ╚══════════════════════════════════════════════════╝");
  console.log("");
}

function printArticlePreview(article, index, total) {
  console.log(`\n  ┌─── Article ${index}/${total} ${"─".repeat(40 - String(index).length - String(total).length)}┐`);
  console.log(`  │ Title:     ${article.title}`);
  console.log(`  │ Slug:      ${article.slug}`);
  console.log(`  │ Category:  ${article.category}`);
  console.log(`  │ Date:      ${article.date}`);
  console.log(`  │ Read Time: ${article.readTime}`);
  console.log(`  │ Words:     ~${article.wordCount}`);
  console.log(`  │ Excerpt:   ${article.excerpt.slice(0, 70)}...`);
  console.log(`  └${"─".repeat(55)}┘`);
}

// ─── INTERACTIVE MODE ────────────────────────────────────

async function askQuestion(query) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function interactiveMode() {
  console.log("\n  📋 Interactive Blog Generator\n");
  console.log("  Choose generation mode:\n");
  console.log("    1. 🌐 Auto-research (scrape web for trending topics)");
  console.log("    2. 📝 Pick from topic database");
  console.log("    3. ✏️  Enter your own topic");
  console.log("    4. 🎲 Random topic");
  console.log("");

  const choice = await askQuestion("  Your choice (1-4): ");

  switch (choice) {
    case "1": {
      console.log("\n  Researching trends...");
      const topics = await researchTopics({ maxResults: 5, useWeb: true });
      if (topics.length === 0) {
        console.log("  ⚠️  No web results. Falling back to database.");
        return interactiveMode();
      }
      console.log("\n  📊 Trending topics:\n");
      topics.forEach((t, i) => {
        console.log(`    ${i + 1}. ${t.topic}`);
        console.log(`       Angle: ${t.angle}`);
        console.log(`       Score: ${"★".repeat(Math.min(5, Math.ceil(t.score)))}${"☆".repeat(Math.max(0, 5 - Math.ceil(t.score)))}\n`);
      });
      const pick = await askQuestion("  Pick a number (or Enter to auto-pick): ");
      const idx = pick ? parseInt(pick) - 1 : 0;
      return topics[idx] || topics[0];
    }

    case "2": {
      console.log("\n  📚 Topic Database:\n");
      TOPIC_DATABASE.forEach((t, i) => {
        console.log(`    ${i + 1}. ${t.topic}`);
        console.log(`       Category: ${t.category}`);
        console.log(`       Angle: ${t.angle}\n`);
      });
      const pick = await askQuestion("  Pick a number: ");
      return TOPIC_DATABASE[parseInt(pick) - 1] || TOPIC_DATABASE[0];
    }

    case "3": {
      const topic = await askQuestion("  Enter your topic: ");
      if (!topic) {
        console.log("  ❌ No topic entered.");
        return interactiveMode();
      }
      return {
        id: "custom",
        topic,
        keywords: topic.split(" "),
        angle: "Comprehensive guide",
        category: "Payments",
        score: 10,
      };
    }

    case "4": {
      const random = TOPIC_DATABASE[Math.floor(Math.random() * TOPIC_DATABASE.length)];
      console.log(`\n  🎲 Random topic: ${random.topic}`);
      return random;
    }

    default:
      console.log("  Invalid choice. Using random topic.");
      return TOPIC_DATABASE[Math.floor(Math.random() * TOPIC_DATABASE.length)];
  }
}

// ─── MAIN ────────────────────────────────────────────────

async function main() {
  printBanner();
  const opts = parseArgs();

  // List topics mode
  if (opts.listTopics) {
    console.log("  📚 Available Topics:\n");
    TOPIC_DATABASE.forEach((t, i) => {
      console.log(`    ${String(i + 1).padStart(2)}. [${t.category}] ${t.topic}`);
      console.log(`        ${t.angle}`);
    });
    console.log(`\n  Total: ${TOPIC_DATABASE.length} topics`);
    console.log('  Use --topic "your topic" to generate a specific article.\n');
    return;
  }

  let selectedTopics = [];

  // Interactive mode
  if (opts.interactive) {
    const topic = await interactiveMode();
    if (topic) selectedTopics = [topic];
  }
  // Specific topic
  else if (opts.specific && opts.topic) {
    selectedTopics = [{
      id: "custom",
      topic: opts.topic,
      keywords: opts.topic.split(" "),
      angle: "Comprehensive guide",
      category: "Payments",
      score: 10,
    }];
  }
  // Auto mode
  else {
    console.log("  🔍 Researching topics...\n");
    const topics = await researchTopics({
      maxResults: opts.count,
      useWeb: !opts.noWeb,
    });

    if (topics.length === 0) {
      console.log("  ⚠️  No topics found. Using random from database.\n");
      const shuffled = [...TOPIC_DATABASE].sort(() => Math.random() - 0.5);
      selectedTopics = shuffled.slice(0, opts.count);
    } else {
      selectedTopics = topics;
    }
  }

  console.log(`\n  📝 Generating ${selectedTopics.length} article(s)...\n`);

  // Generate and publish articles
  let published = 0;
  let attempts = 0;

  for (let i = 0; i < selectedTopics.length; i++) {
    const topic = selectedTopics[i];
    attempts++;

    console.log(`\n  ${"═".repeat(52)}`);
    console.log(`  📝 Topic: ${topic.topic}`);
    console.log(`  ${"═".repeat(52)}`);

    // Build context with scraped data
    const context = buildContext(topic);

    // Generate article
    const article = buildArticle(topic, context);
    printArticlePreview(article, i + 1, selectedTopics.length);

    if (opts.dryRun) {
      console.log("\n  ⏸️  Dry run — not saving.\n");
      console.log("  📄 First 500 words:\n");
      console.log("  " + article.content.split(/\s+/).slice(0, 100).join(" ") + "...\n");
      published++;
      continue;
    }

    // Confirm (non-interactive only asks once for batch)
    if (!opts.interactive && selectedTopics.length === 1) {
      const confirm = await askQuestion("\n  ✅ Publish this article? (y/n): ");
      if (confirm.toLowerCase() !== "y") {
        console.log("  ⏭️  Skipped.\n");
        continue;
      }
    }

    // Try to publish (may retry with different variant if duplicate)
    let success = false;
    let retryCount = 0;
    while (!success && retryCount < 3) {
      success = publishArticle(article);
      if (!success && retryCount < 2) {
        console.log("  🔄 Generating variant...");
        const newContext = buildContext({ ...topic, topic: topic.topic + " " + ["guide", "tips", "strategy", "overview"][retryCount] });
        const newArticle = buildArticle({ ...topic, topic: topic.topic + " " + ["guide", "tips", "strategy", "overview"][retryCount] }, newContext);
        Object.assign(article, newArticle);
        retryCount++;
      } else {
        break;
      }
    }

    if (success) {
      published++;
      // Generate OG image
      await generateOGImage(article);
      console.log(`  🎉 Published: ${article.slug}`);
      console.log(`  🔗 ${`https://ruxxdigital.name.ng/blog/${article.slug}`}`);
    } else {
      console.log("  ❌ Failed to publish (duplicate or file error)");
    }
  }

  // Summary
  console.log("\n  ══════════════════════════════════════════════════");
  console.log(`  📊 Summary: ${published}/${selectedTopics.length} articles published`);
  if (published > 0) {
    console.log("  💡 Run 'npm run build' to see them on your site");
  }
  console.log("  ══════════════════════════════════════════════════\n");
}

main().catch((err) => {
  console.error("\n  ❌ Fatal error:", err.message);
  process.exit(1);
});
