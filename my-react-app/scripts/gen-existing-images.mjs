import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { generateOGImage } from "./engine/og-image.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const content = readFileSync(join(ROOT, "src", "lib", "articles.js"), "utf8");

const slugs = [...content.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const titles = [...content.matchAll(/title:\s*"([^"]+)"/g)].map((m) => m[1]);
const categories = [...content.matchAll(/category:\s*"([^"]+)"/g)].map((m) => m[1]);

console.log(`\n🖼️  Generating OG images for ${slugs.length} existing articles...\n`);

for (let i = 0; i < slugs.length; i++) {
  console.log(`  ${i + 1}. ${titles[i]}`);
  await generateOGImage({
    title: titles[i],
    category: categories[i],
    slug: slugs[i],
  });
}

console.log(`\n✅ Done! Generated ${slugs.length} images.\n`);
