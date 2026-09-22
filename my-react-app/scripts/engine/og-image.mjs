/**
 * OG Image Generator for Blog Articles
 * Generates branded 1200x630 PNG images from SVG using sharp
 */

import sharp from "sharp";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const OG_DIR = join(ROOT, "public", "og", "blog");
const LOGO_PATH = join(ROOT, "public", "favicon-192.png");

// ─── COLOR THEMES ────────────────────────────────────────
const THEMES = {
  Payments: {
    gradient: ["#7c3aed", "#4f46e5"],
    accent: "#a78bfa",
    icon: "💳",
  },
  Fintech: {
    gradient: ["#059669", "#0d9488"],
    accent: "#34d399",
    icon: "🏦",
  },
  "Gift Cards": {
    gradient: ["#d97706", "#ea580c"],
    accent: "#fbbf24",
    icon: "🎁",
  },
  Technology: {
    gradient: ["#2563eb", "#7c3aed"],
    accent: "#60a5fa",
    icon: "🔒",
  },
  Business: {
    gradient: ["#dc2626", "#ea580c"],
    accent: "#f87171",
    icon: "📈",
  },
};

const DEFAULT_THEME = {
  gradient: ["#7c3aed", "#4f46e5"],
  accent: "#a78bfa",
  icon: "💰",
};

// ─── SVG TEMPLATES ───────────────────────────────────────

function wrapText(text, maxChars = 30) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    if ((currentLine + " " + word).trim().length > maxChars) {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = (currentLine + " " + word).trim();
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines.slice(0, 3); // Max 3 lines
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateSVG(title, category, slug) {
  const theme = THEMES[category] || DEFAULT_THEME;
  const lines = wrapText(title, 28);
  const titleY = lines.length === 1 ? 300 : lines.length === 2 ? 270 : 240;

  const titleLines = lines
    .map(
      (line, i) =>
        `<text x="80" y="${titleY + i * 52}" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="bold" fill="white">${escapeXml(line)}</text>`
    )
    .join("\n    ");

  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${theme.gradient[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${theme.gradient[1]};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:white;stop-opacity:0.05" />
      <stop offset="50%" style="stop-color:white;stop-opacity:0.1" />
      <stop offset="100%" style="stop-color:white;stop-opacity:0" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)" />

  <!-- Decorative circles -->
  <circle cx="1100" cy="80" r="200" fill="white" opacity="0.05" />
  <circle cx="1050" cy="120" r="150" fill="white" opacity="0.05" />
  <circle cx="100" cy="580" r="120" fill="white" opacity="0.03" />

  <!-- Shine overlay -->
  <rect width="1200" height="630" fill="url(#shine)" />

  <!-- Category badge -->
  <rect x="80" y="160" width="${category.length * 14 + 40}" height="36" rx="18" fill="white" opacity="0.2" />
  <text x="${category.length * 7 + 100}" y="183" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="bold" fill="white" text-anchor="middle">${escapeXml(category.toUpperCase())}</text>

  <!-- Title -->
  ${titleLines}

  <!-- Divider -->
  <rect x="80" y="${titleY + lines.length * 52 + 20}" width="120" height="3" rx="1.5" fill="${theme.accent}" />

  <!-- Brand -->
  <text x="80" y="${titleY + lines.length * 52 + 65}" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="bold" fill="white" opacity="0.9">Ruxx Digital Services</text>
  <text x="80" y="${titleY + lines.length * 52 + 88}" font-family="Arial, Helvetica, sans-serif" font-size="13" fill="white" opacity="0.5">ruxxdigital.name.ng</text>

  <!-- Bottom accent bar -->
  <rect x="0" y="620" width="1200" height="10" fill="${theme.accent}" opacity="0.6" />
</svg>`;
}

// ─── IMAGE GENERATOR ─────────────────────────────────────

/**
 * Generate an OG image for an article
 * @param {object} article - { title, category, slug }
 * @returns {string} Path to the generated image
 */
export async function generateOGImage(article) {
  // Ensure output directory exists
  if (!existsSync(OG_DIR)) {
    mkdirSync(OG_DIR, { recursive: true });
  }

  const outputPath = join(OG_DIR, `${article.slug}.png`);
  const svg = generateSVG(article.title, article.category, article.slug);

  try {
    await sharp(Buffer.from(svg)).png().toFile(outputPath);
    console.log(`  🖼️  OG image: og/blog/${article.slug}.png`);
    return `/og/blog/${article.slug}.png`;
  } catch (err) {
    console.error(`  ⚠️  Image generation failed: ${err.message}`);
    return null;
  }
}

/**
 * Generate a default OG image for the site
 */
export async function generateDefaultOGImage() {
  const svg = generateSVG(
    "Smarter Payments for Everyday Life",
    "Fintech",
    "default"
  );
  const outputPath = join(OG_DIR, "default.png");

  if (!existsSync(OG_DIR)) {
    mkdirSync(OG_DIR, { recursive: true });
  }

  try {
    await sharp(Buffer.from(svg)).png().toFile(outputPath);
    console.log("  🖼️  Default OG image generated");
    return "/og/blog/default.png";
  } catch (err) {
    console.error(`  ⚠️  Default image failed: ${err.message}`);
    return null;
  }
}

/**
 * Batch generate images for all articles
 */
export async function generateAllImages(articles) {
  console.log("\n🖼️  Generating OG images...\n");
  const results = [];

  for (const article of articles) {
    const imagePath = await generateOGImage(article);
    results.push({ slug: article.slug, image: imagePath });
  }

  console.log(`\n  ✅ Generated ${results.filter((r) => r.image).length}/${articles.length} images\n`);
  return results;
}

export { THEMES, DEFAULT_THEME };
