/**
 * Article Generator - Orchestrates research and content creation
 * Pure Node.js, no 3rd party AI APIs
 */

import { scrapeTrends, getRandomStats, getRandomFact, extractEntities } from "./scraper.mjs";
import { generateArticle, generateExcerpt, generateTitle, pickCategory, pick, capitalize } from "./templates.mjs";

// ─── TOPIC DATABASE ──────────────────────────────────────
const TOPIC_DATABASE = [
  {
    id: "bill-payments-guide",
    topic: "pay bills online in Nigeria",
    keywords: ["bill payment", "online payment", "mobile payment", "Nigeria"],
    angle: "Complete guide covering all bill types and step-by-step instructions",
    category: "Payments",
  },
  {
    id: "airtime-data-recharge",
    topic: "buy airtime and data bundles on your phone",
    keywords: ["airtime", "data", "recharge", "MTN", "Airtel", "Glo"],
    angle: "How to top up any Nigerian network instantly and save money",
    category: "Payments",
  },
  {
    id: "electricity-bills",
    topic: "pay electricity bills from your phone in Nigeria",
    keywords: ["electricity", "prepaid meter", "token", "IKEDC", "EKEDC"],
    angle: "Instant electricity token purchase for all Nigerian distribution companies",
    category: "Payments",
  },
  {
    id: "gift-card-trading",
    topic: "trade gift cards for Naira at the best rates",
    keywords: ["gift card", "Apple", "Amazon", "Google Play", "trading"],
    angle: "How to buy and sell gift cards profitably in Nigeria",
    category: "Gift Cards",
  },
  {
    id: "dstv-subscription",
    topic: "renew your DStv and GOtv subscription instantly",
    keywords: ["DStv", "GOtv", "StarTimes", "cable TV", "subscription"],
    angle: "Never miss your favorite shows — instant TV subscription renewal",
    category: "Payments",
  },
  {
    id: "mobile-money-africa",
    topic: "use mobile money safely and efficiently in Africa",
    keywords: ["mobile money", "Africa", "digital wallet", "financial inclusion"],
    angle: "The complete guide to mobile money for African consumers",
    category: "Fintech",
  },
  {
    id: "fintech-security",
    topic: "protect yourself from online payment fraud in Nigeria",
    keywords: ["security", "fraud", "scam", "phishing", "safe"],
    angle: "Essential security practices for digital payment users",
    category: "Technology",
  },
  {
    id: "pos-business",
    topic: "start a profitable POS business in Nigeria",
    keywords: ["POS", "agent banking", "business", "entrepreneur"],
    angle: "Step-by-step guide to launching and running a POS business",
    category: "Business",
  },
  {
    id: "betting-wallet",
    topic: "fund your betting wallet instantly from your phone",
    keywords: ["betting", "Bet9ja", "Sportybet", "sports betting"],
    angle: "Quick and easy ways to fund your betting account in Nigeria",
    category: "Payments",
  },
  {
    id: "digital-payments-trends",
    topic: "understand digital payment trends shaping Nigeria in 2026",
    keywords: ["trends", "digital payment", "fintech", "future"],
    angle: "Analysis of the latest developments in Nigeria's fintech space",
    category: "Fintech",
  },
  {
    id: "ussd-banking",
    topic: "use USSD banking effectively without internet",
    keywords: ["USSD", "banking", "offline", "no internet"],
    angle: "How to bank without data using USSD codes in Nigeria",
    category: "Technology",
  },
  {
    id: "financial-literacy",
    topic: "improve your financial literacy and manage money better",
    keywords: ["financial literacy", "budgeting", "saving", "money management"],
    angle: "Practical financial tips for everyday Nigerians",
    category: "Business",
  },
  {
    id: "cryptocurrency-nigeria",
    topic: "buy and sell cryptocurrency safely in Nigeria",
    keywords: ["crypto", "bitcoin", "ethereum", "blockchain"],
    angle: "A beginner-friendly guide to crypto trading in Nigeria",
    category: "Fintech",
  },
  {
    id: "enaira-guide",
    topic: "use the eNaira digital currency in Nigeria",
    keywords: ["eNaira", "CBN", "digital currency", "central bank"],
    angle: "Everything you need to know about Nigeria's digital currency",
    category: "Fintech",
  },
  {
    id: "virtual-account",
    topic: "use virtual bank accounts for online payments",
    keywords: ["virtual account", "online payment", "bank transfer"],
    angle: "How virtual accounts simplify online transactions in Nigeria",
    category: "Technology",
  },
];

// ─── RESEARCH ENGINE ─────────────────────────────────────

/**
 * Research trending topics from web + internal database
 */
export async function researchTopics(options = {}) {
  const { maxResults = 5, useWeb = true } = options;

  console.log("\n🔬 Research phase starting...\n");

  // 1. Scrape web for trending topics
  let webTopics = [];
  if (useWeb) {
    webTopics = await scrapeTrends();
    console.log(`\n  📊 Found ${webTopics.length} trending topics from web\n`);
  }

  // 2. Score internal topics based on web trends
  const scoredTopics = TOPIC_DATABASE.map((t) => {
    let score = Math.random() * 5; // Base random score for variety

    // Boost score if topic matches web trends
    for (const web of webTopics) {
      const webLower = web.text.toLowerCase();
      for (const kw of t.keywords) {
        if (webLower.includes(kw.toLowerCase())) {
          score += 3;
        }
      }
    }

    return { ...t, score };
  });

  // 3. Sort by score and return top results
  const sorted = scoredTopics.sort((a, b) => b.score - a.score);
  return sorted.slice(0, maxResults);
}

/**
 * Build context for article generation from research
 */
export function buildContext(topic) {
  const stats = getRandomStats(3);
  const fact = getRandomFact();
  const entities = extractEntities(topic.topic);

  return {
    topic: topic.topic,
    angle: topic.angle,
    category: topic.category,
    keywords: topic.keywords,
    stats: [...stats, fact],
    entities,
    siteName: "Ruxx Digital Services",
    siteUrl: "https://ruxxdigital.name.ng",
  };
}

// ─── ARTICLE BUILDER ─────────────────────────────────────

/**
 * Build a complete article ready for publishing
 */
export function buildArticle(topic, context) {
  const title = generateTitle(topic.topic);
  const content = generateArticle(topic.topic, context, "comprehensive");
  const excerpt = generateExcerpt(topic.topic);
  const readTime = estimateReadTime(content);

  return {
    slug: buildSlug(title),
    title,
    excerpt,
    date: getTodayDate(),
    readTime,
    category: context.category,
    content: content.trim(),
    wordCount: content.split(/\s+/).length,
  };
}

/**
 * Build multiple articles from a list of topics
 */
export function buildArticles(topics) {
  return topics.map((topic) => {
    const context = buildContext(topic);
    return buildArticle(topic, context);
  });
}

// ─── HELPERS ─────────────────────────────────────────────

function buildSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function estimateReadTime(content) {
  const words = content.split(/\s+/).length;
  const mins = Math.ceil(words / 200);
  return `${mins} min read`;
}

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export { TOPIC_DATABASE };
