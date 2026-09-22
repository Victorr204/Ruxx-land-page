/**
 * Web Scraper for Nigerian Fintech News
 * Scrapes trending topics from real news sources
 */

const SOURCES = [
  {
    name: "TechCabal",
    url: "https://techcabal.com",
    selectors: { article: "article", title: "h2, h3, .entry-title", link: "a[href]" },
  },
  {
    name: "Nairametrics",
    url: "https://nairametrics.com",
    selectors: { article: "article", title: "h2, h3, .entry-title", link: "a[href]" },
  },
  {
    name: "TechPoint Africa",
    url: "https://techpoint.africa",
    selectors: { article: "article", title: "h2, h3", link: "a[href]" },
  },
  {
    name: "Pulse Nigeria",
    url: "https://pulse.ng/business",
    selectors: { article: "article, .story", title: "h2, h3, .headline", link: "a[href]" },
  },
  {
    name: "Vanguard Business",
    url: "https://www.vanguardngr.com/business/",
    selectors: { article: "article, .article-item", title: "h2, h3, h4", link: "a[href]" },
  },
];

const FINTECH_KEYWORDS = [
  "fintech", "payment", "mobile money", "banking", "digital payment",
  "airtime", "data bundle", "recharge", "electricity", "power",
  "gift card", "card trading", "buy gift card", "sell gift card",
  "naira", "currency", "exchange rate", "dollar", "forex",
  "crypto", "bitcoin", "blockchain", "web3",
  "betting", "sports betting", "bet9ja", "sportybet",
  "DStv", "GOtv", "StarTimes", "cable TV", "subscription",
  "POS", "terminal", "agent banking", "USSD",
  "Paystack", "flutterwave", "OPay", "Kuda", "Moniepoint",
  "CBN", "regulation", "central bank", "eNaira",
  "startup", "venture capital", "funding", "investment",
  "scam", "fraud", "security", "phishing",
  "transaction", "transfer", "wallet", "virtual account",
  "Nigeria", "African", "Lagos", "Abuja",
];

const FINTECH统计数据 = [
  "Nigeria's digital payment transactions exceeded 3.4 billion in 2025",
  "Over 40 million Nigerians now use mobile banking apps",
  "The Nigerian fintech sector attracted $1.2 billion in investment last year",
  "Mobile money transactions in Africa grew by 42% year-over-year",
  "Nigeria has over 200 million active mobile phone subscribers",
  "Digital payments now account for 60% of all financial transactions in Nigeria",
  "The POS agent network in Nigeria exceeds 1.5 million terminals",
  "Nigeria's eNaira has recorded over 13 million wallet downloads",
  "Fintech startups in Lagos raised $400 million in the first half of 2025",
  "USSD banking transactions process over $2 billion monthly in Nigeria",
  "Nigeria's broadband penetration reached 48% in 2025",
  "Over 60% of Nigerians aged 18-35 now prefer digital payment methods",
  "The average Nigerian completes 3.2 digital transactions per week",
  "Gift card trading volume in Nigeria grew by 85% in the past year",
  "Electricity token purchases via mobile apps increased by 200% since 2024",
];

const RANDOM统计数据 = [
  "a recent survey showed that 78% of Nigerians find mobile payments more convenient",
  "industry reports indicate that bill payment apps save users an average of 2 hours per week",
  "the average transaction on fintech platforms takes less than 10 seconds to complete",
  "over 90% of smartphone users in Nigeria have used a digital payment service",
  "customer satisfaction rates for mobile payment apps exceed 85% in Nigeria",
  "the cost of sending money via mobile is 70% lower than traditional bank transfers",
  "digital payment adoption in rural Nigeria grew by 55% in the past year",
  "the average Nigerian household now spends 35% of their bills through mobile apps",
];

/**
 * Fetch a page with timeout and error handling
 */
async function fetchPage(url, timeout = 8000) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/**
 * Extract text content from HTML
 */
function extractText(html, maxLen = 5000) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#\d+;/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLen);
}

/**
 * Extract headlines from HTML
 */
function extractHeadlines(html) {
  const headlines = [];
  // Match h2, h3, h4 tags and common headline patterns
  const patterns = [
    /<h[2-4][^>]*>(.*?)<\/h[2-4]>/gi,
    /<a[^>]+class="[^"]*title[^"]*"[^>]*>(.*?)<\/a>/gi,
    /<a[^>]+class="[^"]*headline[^"]*"[^>]*>(.*?)<\/a>/gi,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const text = match[1].replace(/<[^>]+>/g, "").trim();
      if (text.length > 15 && text.length < 200) {
        headlines.push(text);
      }
    }
  }

  return [...new Set(headlines)].slice(0, 15);
}

/**
 * Score a headline for fintech relevance
 */
function scoreRelevance(text) {
  const lower = text.toLowerCase();
  let score = 0;
  for (const kw of FINTECH_KEYWORDS) {
    if (lower.includes(kw.toLowerCase())) score += 2;
  }
  // Bonus for Nigerian context
  if (/nigeria|nigerian|lagos|abuja|naira/i.test(text)) score += 3;
  // Bonus for numbers (indicates data-driven content)
  if (/\d+/.test(text)) score += 1;
  return score;
}

/**
 * Scrape all sources and return trending topics
 */
export async function scrapeTrends() {
  console.log("\n🔍 Scraping fintech news sources...\n");
  const allHeadlines = [];

  for (const source of SOURCES) {
    process.stdout.write(`  📡 ${source.name}... `);
    const html = await fetchPage(source.url);
    if (html) {
      const headlines = extractHeadlines(html);
      const scored = headlines
        .map((h) => ({ text: h, source: source.name, score: scoreRelevance(h) }))
        .filter((h) => h.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
      allHeadlines.push(...scored);
      console.log(`✅ ${scored.length} relevant topics`);
    } else {
      console.log("⚠️  unreachable");
    }
  }

  // Sort by relevance and return top results
  const sorted = allHeadlines.sort((a, b) => b.score - a.score);
  const unique = [];
  const seen = new Set();
  for (const item of sorted) {
    const key = item.text.toLowerCase().slice(0, 50);
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(item);
    }
  }

  return unique.slice(0, 10);
}

/**
 * Get random statistics for articles
 */
export function getRandomStats(count = 3) {
  const all = [...FINTECH统计数据, ...RANDOM统计数据];
  const shuffled = all.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Get random fintech fact
 */
export function getRandomFact() {
  return FINTECH统计数据[Math.floor(Math.random() * FINTECH统计数据.length)];
}

/**
 * Extract key entities from text (names, amounts, dates)
 */
export function extractEntities(text) {
  const entities = {
    companies: [],
    amounts: [],
    percentages: [],
    dates: [],
  };

  // Company names (common fintech)
  const companies = [
    "Paystack", "Flutterwave", "OPay", "Kuda", "Moniepoint", "PalmPay",
    "Chipper Cash", "Carbon", "FairMoney", "Branch", "PiggyVest",
    "Risevest", "Bamboo", "Quidax", "Luno", "Busha",
    "MTN", "Airtel", "Glo", "9Mobile",
    "DStv", "GOtv", "StarTimes",
    "Bet9ja", "Sportybet", "Betking", "NairaBet",
    "IKEDC", "EKEDC", "KEDCO", "IBEDC", "IEDC", "AEDC",
    "GTBank", "Access Bank", "Zenith Bank", "UBA", "First Bank",
  ];

  for (const company of companies) {
    if (text.includes(company)) entities.companies.push(company);
  }

  // Amounts (₦, $, millions, billions)
  const amountMatches = text.match(/[₦$]\s*[\d,.]+\s*(million|billion|trillion)?/gi) || [];
  entities.amounts = amountMatches.slice(0, 3);

  // Percentages
  const percentMatches = text.match(/\d+(\.\d+)?%/g) || [];
  entities.percentages = percentMatches.slice(0, 3);

  return entities;
}

export { FINTECH_KEYWORDS, FINTECH统计数据, RANDOM统计数据 };
