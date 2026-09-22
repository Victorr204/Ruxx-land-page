/**
 * Article Template Engine
 * Generates unique, well-structured articles from templates + real data
 */

// ─── UTILITY ─────────────────────────────────────────────
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ─── WORD BANKS ──────────────────────────────────────────
const TRANSITIONS = [
  "Furthermore", "Moreover", "In addition", "Additionally", "Beyond that",
  "Similarly", "Likewise", "Equally important", "On top of that",
  "What's more", "As a result", "Consequently", "Therefore", "Thus",
  "For this reason", "Because of this", "This means that",
  "In other words", "To put it simply", "Put differently",
  "Notably", "Importantly", "Significantly", "Interestingly",
  "Accordingly", "Hence", "Thereby", "Thereupon",
];

const INTRO_PHRASES = [
  "In today's fast-paced digital landscape",
  "As Nigeria's digital economy continues to evolve",
  "With the rapid growth of mobile technology across Africa",
  "In an era where convenience is paramount",
  "As more Nigerians embrace digital solutions",
  "Given the increasing demand for instant financial services",
  "Across Nigeria's bustling fintech ecosystem",
  "In a country where mobile phones are everywhere",
  "As smartphone adoption reaches new heights in Nigeria",
  "Within Africa's most vibrant tech hub",
  "In a market where speed and reliability matter most",
  "As the financial technology sector matures in Nigeria",
  "With millions of Nigerians seeking better payment solutions",
  "In a nation leading Africa's digital revolution",
  "As digital transformation reshapes everyday transactions",
];

const CONCLUDING_PHRASES = [
  "Ultimately", "In conclusion", "To sum up", "All things considered",
  "Taking everything into account", "Looking at the bigger picture",
  "At the end of the day", "When all is said and done",
  "From a broader perspective", "Stepping back",
  "On a final note", "As a final thought",
];

const ACTION_VERBS = [
  "embrace", "adopt", "leverage", "utilize", "maximize",
  "explore", "discover", "experience", "enjoy", "benefit from",
  "take advantage of", "make the most of", "tap into",
  "harness", "integrate", "implement", "switch to", "transition to",
];

const POSITIVE_ADJ = [
  "seamless", "efficient", "reliable", "instant", "convenient",
  "secure", "affordable", "accessible", "user-friendly", "innovative",
  "cutting-edge", "trusted", "robust", "streamlined", "hassle-free",
  "lightning-fast", "transparent", "dependable", "sophisticated",
];

const NIGERIAN_CONTEXT = [
  "the average Nigerian smartphone user",
  "millions of Nigerians across Lagos, Abuja, and Port Harcourt",
  "Nigerian consumers who value speed and reliability",
  "the growing middle class in Nigeria",
  "tech-savvy young Nigerians aged 18-35",
  "business owners across Nigeria's major cities",
  "Nigerian families managing their monthly expenses",
  "the bustling commercial hubs of Lagos and Abuja",
  "students and professionals across Nigerian universities",
  "small business owners and traders in Nigerian markets",
  "people living in both urban and rural communities",
  "anyone looking to simplify their financial transactions",
  "households managing recurring monthly expenses",
  "anyone who wants faster, more reliable payment processing",
];

const BENEFITS = [
  "saving both time and money",
  "eliminating the need for physical travel",
  "providing instant confirmation of every transaction",
  "ensuring your payments are processed within seconds",
  "giving you complete control over your finances",
  "offering transparent pricing with no hidden charges",
  "delivering reliable service around the clock",
  "making financial management simpler than ever before",
  "reducing the stress of bill payments significantly",
  "providing a single platform for all your payment needs",
];

const SECURITY_TIPS = [
  "Never share your login credentials with anyone, including family members.",
  "Always enable two-factor authentication on your payment accounts.",
  "Use strong, unique passwords that combine letters, numbers, and symbols.",
  "Regularly monitor your transaction history for any unauthorized activity.",
  "Avoid using public Wi-Fi networks when making financial transactions.",
  "Keep your phone's operating system and apps updated to the latest versions.",
  "Be cautious of phishing emails or SMS messages claiming to be from your payment provider.",
  "Log out of your payment app after each session, especially on shared devices.",
  "Set up transaction alerts to receive instant notifications for every payment.",
  "Contact your service provider immediately if you notice suspicious activity.",
  "Only download payment apps from official app stores like Google Play or the App Store.",
  "Verify the recipient's details before sending money to avoid costly mistakes.",
];

const HOW_TO_STEPS = [
  { step: "Download the app", variants: [
    "Download the Ruxx app from Google Play Store or Apple App Store",
    "Get the Ruxx application from your phone's app store",
    "Install the Ruxx app on your smartphone",
  ]},
  { step: "Create account", variants: [
    "Sign up with your phone number and basic details",
    "Create your account by entering your name, email, and phone number",
    "Register using your mobile number and verify your identity",
  ]},
  { step: "Fund wallet", variants: [
    "Fund your wallet via bank transfer to your unique virtual account",
    "Add money to your wallet through instant bank transfer",
    "Top up your wallet using any Nigerian bank's transfer feature",
  ]},
  { step: "Select service", variants: [
    "Choose the service you need from the dashboard",
    "Select your desired bill payment or gift card option",
    "Pick the service category and enter the required details",
  ]},
  { step: "Confirm payment", variants: [
    "Confirm the payment and receive instant delivery",
    "Review and approve the transaction",
    "Complete the payment with a single tap",
  ]},
];

// ─── SECTION TEMPLATES ───────────────────────────────────

function generateIntroSection(topic, context) {
  const intro = pick(INTRO_PHRASES);
  const transition = pick(TRANSITIONS);
  const stat = context.stats?.[0] || "digital payment adoption continues to accelerate across the country";

  // Smart topic phrasing
  const topicLower = topic.toLowerCase();
  let topicPhrase;
  if (/^pay\b/.test(topicLower)) {
    topicPhrase = `mastering ${topicLower}`;
  } else if (/^buy\b/.test(topicLower)) {
    topicPhrase = `the process of ${topicLower}`;
  } else if (/^sell\b/.test(topicLower)) {
    topicPhrase = `the ins and outs of ${topicLower}`;
  } else if (/^use\b/.test(topicLower)) {
    topicPhrase = `making the most of ${topicLower}`;
  } else if (/^start\b/.test(topicLower)) {
    topicPhrase = `getting started with ${topicLower}`;
  } else if (/electricity|power|meter|token|bill/i.test(topicLower)) {
    topicPhrase = `managing ${topicLower}`;
  } else if (/airtime|data|recharge|bundle/i.test(topicLower)) {
    topicPhrase = `the art of ${topicLower}`;
  } else if (/gift card|trade|trading/i.test(topicLower)) {
    topicPhrase = `the world of ${topicLower}`;
  } else if (/dstv|gotv|star|cable|tv|subscription/i.test(topicLower)) {
    topicPhrase = `keeping up with ${topicLower}`;
  } else if (/bet|betting|wallet/i.test(topicLower)) {
    topicPhrase = `getting started with ${topicLower}`;
  } else if (/pos|business/i.test(topicLower)) {
    topicPhrase = `launching ${topicLower}`;
  } else if (/guide|tips|trends/i.test(topicLower)) {
    topicPhrase = `staying informed about ${topicLower}`;
  } else {
    topicPhrase = `understanding ${topicLower}`;
  }

  return `${intro}, ${topicPhrase} has become essential for ${pick(NIGERIAN_CONTEXT)}.

${transition}, the shift toward digital solutions has fundamentally changed how people manage their daily financial tasks. ${capitalize(pick(BENEFITS))}, making it easier than ever to stay on top of your obligations.

${capitalize(pick(TRANSITIONS))}, recent data shows that ${stat}. This trend underscores the growing importance of reliable digital payment platforms.`;
}

function generateProblemSection(topic) {
  const topicCap = topic.charAt(0).toUpperCase() + topic.slice(1);
  const topicLower = topic.toLowerCase();

  // Smart action verb
  let actionVerb;
  let gerund;
  if (/^pay\b/.test(topicLower)) {
    actionVerb = "pay for " + topicLower.replace(/^pay\s+/i, "");
    gerund = "paying for " + topicLower.replace(/^pay\s+/i, "");
  } else if (/^buy\b/.test(topicLower)) {
    actionVerb = "buy " + topicLower.replace(/^buy\s+/i, "");
    gerund = "buying " + topicLower.replace(/^buy\s+/i, "");
  } else if (/^sell\b/.test(topicLower)) {
    actionVerb = "sell " + topicLower.replace(/^sell\s+/i, "");
    gerund = "selling " + topicLower.replace(/^sell\s+/i, "");
  } else if (/^use\b/.test(topicLower)) {
    actionVerb = "use " + topicLower.replace(/^use\s+/i, "");
    gerund = "using " + topicLower.replace(/^use\s+/i, "");
  } else if (/^start\b/.test(topicLower)) {
    actionVerb = "start " + topicLower.replace(/^start\s+/i, "");
    gerund = "starting " + topicLower.replace(/^start\s+/i, "");
  } else if (/electricity|power|meter|token|bill/i.test(topicLower)) {
    actionVerb = "pay " + topicLower;
    gerund = "paying " + topicLower;
  } else if (/airtime|data|recharge|bundle/i.test(topicLower)) {
    actionVerb = "buy " + topicLower;
    gerund = "buying " + topicLower;
  } else if (/gift card|trade|trading/i.test(topicLower)) {
    actionVerb = "trade gift cards";
    gerund = "trading gift cards";
  } else if (/dstv|gotv|star|cable|tv|subscription/i.test(topicLower)) {
    actionVerb = "renew " + topicLower;
    gerund = "renewing " + topicLower;
  } else if (/bet|betting|wallet/i.test(topicLower)) {
    actionVerb = "fund " + topicLower;
    gerund = "funding " + topicLower;
  } else if (/pos|business/i.test(topicLower)) {
    actionVerb = "start a " + topicLower;
    gerund = "starting a " + topicLower;
  } else {
    actionVerb = "handle " + topicLower;
    gerund = "handling " + topicLower;
  }

  const openings = [
    `Despite the growth of digital technology, ${gerund} remains a challenge for many Nigerians.`,
    `The reality of ${gerund} in Nigeria has not always been smooth.`,
    `Ask anyone who has tried to ${actionVerb} using traditional methods — the experience is rarely pleasant.`,
    `Nigerians have long dealt with the frustration of ${gerund} through conventional channels.`,
    `For many people, ${gerund} still feels like more work than it should be.`,
  ];

  const painPoints = [
    "Physical payment centers close early, making it difficult for working professionals to complete transactions during business hours.",
    "Network timeouts and failed transactions are common, leaving customers uncertain about the status of their payments.",
    "Hidden charges and inconsistent pricing make it hard to budget accurately for recurring bills.",
    "Limited operating hours mean that urgent payments often have to wait until the next business day.",
    "Paper-based receipts are easily lost, creating problems when disputes arise.",
    "Geographic limitations mean that people in rural areas have even fewer options for completing payments.",
    "Long processing times turn what should be a 30-second task into a 10-minute ordeal.",
    "Customer support is often unreachable when things go wrong, leaving users stranded.",
  ];

  return `## The Challenge of ${topicCap}

${pick(openings)}

${capitalize(pick(TRANSITIONS))}, the consequences extend beyond mere inconvenience. ${pickN(painPoints, 2).join(" ")}

These challenges have created a clear demand for better solutions — platforms that combine speed, reliability, and accessibility into a single, seamless experience.`;
}

function generateSolutionSection(topic, context) {
  const topicCap = topic.charAt(0).toUpperCase() + topic.slice(1);

  const openings = [
    `Digital payment platforms like Ruxx address these challenges head-on. By consolidating multiple services into a single app, they eliminate the need for separate platforms and physical visits.`,
    `This is exactly where modern fintech solutions make a difference. Platforms such as Ruxx Digital Services have been designed specifically to solve the pain points that Nigerians face daily.`,
    `The solution lies in embracing digital payment platforms that understand the Nigerian market. Ruxx, for instance, was built from the ground up to cater to local payment needs.`,
    `Fortunately, the fintech space has evolved rapidly, and platforms like Ruxx now offer a comprehensive answer to these persistent problems.`,
    `Enter Ruxx — a platform built by Nigerians, for Nigerians, designed to make ${topic.toLowerCase()} as painless as possible.`,
  ];

  const features = [
    "Support for all major Nigerian networks including MTN, Airtel, Glo, and 9Mobile",
    "Instant processing of electricity tokens from all distribution companies",
    "Competitive gift card rates with transparent pricing and no hidden fees",
    "24/7 availability so you can make payments anytime, anywhere",
    "Real-time transaction notifications for complete peace of mind",
    "A clean, intuitive interface designed for users of all technical levels",
    "Comprehensive transaction history for easy record-keeping and budgeting",
    "Multiple payment funding options including bank transfer and card payments",
    "Instant transaction confirmations with digital receipts",
    "Dedicated customer support that actually responds",
  ];

  return `## How Ruxx Solves This

${pick(openings)}

Here are the key features that set Ruxx apart:

${pickN(features, 5).map((f) => `- **${f.split(" ")[0]}** — ${f}`).join("\n")}

${capitalize(pick(TRANSITIONS))}, by bringing all these capabilities together in one place, Ruxx transforms what used to be a tedious multi-step process into a quick, effortless experience.`;
}

function generateHowToSection(topic) {
  const steps = pickN(HOW_TO_STEPS, 5);

  // Smart phrasing
  const topicLower = topic.toLowerCase();
  let phrase;
  if (/gift card|trade|trading/i.test(topicLower)) {
    phrase = "getting started with gift card trading through Ruxx";
  } else if (/electricity|power|meter/i.test(topicLower)) {
    phrase = "paying your electricity bill through Ruxx";
  } else if (/airtime|data|recharge/i.test(topicLower)) {
    phrase = "recharging your phone through Ruxx";
  } else if (/bet|betting|wallet/i.test(topicLower)) {
    phrase = "funding your betting wallet through Ruxx";
  } else if (/dstv|gotv|star|cable|tv/i.test(topicLower)) {
    phrase = "renewing your TV subscription through Ruxx";
  } else if (/pos|business/i.test(topicLower)) {
    phrase = "setting up your POS business with Ruxx";
  } else {
    phrase = `using Ruxx for ${topicLower}`;
  }

  return `## Getting Started: A Step-by-Step Guide

Getting started with ${phrase} is straightforward. Here is what you need to do:

${steps.map((s, i) => `${i + 1}. **${pick(s.variants)}**`).join("\n")}

That is it. The entire process takes less than two minutes from download to your first successful transaction. No paperwork, no branch visits, no waiting.`;
}

function generateStatsSection(context) {
  const stats = context.stats || [];

  return `## The Numbers Tell the Story

${stats.length > 0
    ? stats.map((s) => `- ${s}`).join("\n")
    : `- ${pick([
        "Nigeria's digital payment market is projected to reach $10 billion by 2027",
        "Mobile money users in Africa surpassed 600 million in 2025",
        "The average Nigerian completes over 3 digital transactions per week",
        "Digital payment adoption grew by 35% in the past 12 months",
      ])}`
  }

These figures paint a clear picture: digital payments are no longer a luxury — they are the new normal. ${capitalize(pick(TRANSITIONS))}, platforms that fail to keep up with this shift risk becoming irrelevant.`;
}

function generateSecuritySection() {
  const tips = pickN(SECURITY_TIPS, 5);

  return `## Staying Safe: Security Best Practices

While digital payment platforms offer tremendous convenience, it is equally important to practice good security habits. Here are essential tips to keep your transactions secure:

${tips.map((t) => `- ${t}`).join("\n")}

${pick(CONCLUDING_PHRASES).toLowerCase()}, by following these practices, you can enjoy the full benefits of digital payments while keeping your financial information safe and secure.`;
}

function generateComparisonSection(topic) {
  const topicCap = topic.charAt(0).toUpperCase() + topic.slice(1);

  // Clean topic for table header
  const cleanTopic = topicCap
    .replace(/^pay\b\s*/i, "")
    .replace(/^buy\b\s*/i, "")
    .replace(/^sell\b\s*/i, "")
    .replace(/^use\b\s*/i, "")
    .replace(/^start\b\s*/i, "")
    .trim();

  return `## Traditional vs. Digital: ${cleanTopic}

| Aspect | Traditional Method | Digital Platform |
|---|---|---|
| **Speed** | Minutes to hours | Under 10 seconds |
| **Availability** | Limited hours | 24/7/365 |
| **Location** | Physical presence required | Anywhere with internet |
| **Receipt** | Paper (easily lost) | Digital (stored permanently) |
| **Cost** | Often higher | Competitive rates |
| **Transparency** | Variable | Clear, upfront pricing |
| **Support** | In-person only | In-app chat, email, phone |

The contrast is stark. Digital platforms consistently outperform traditional methods across every metric that matters to consumers.`;
}

function generateFutureSection(topic) {
  const topicCap = topic.charAt(0).toUpperCase() + topic.slice(1);
  const cleanTopic = topicCap
    .replace(/^pay\b\s*/i, "")
    .replace(/^buy\b\s*/i, "")
    .replace(/^sell\b\s*/i, "")
    .replace(/^use\b\s*/i, "")
    .replace(/^start\b\s*/i, "")
    .trim();

  return `## What Lies Ahead for ${cleanTopic} in Nigeria

The future of digital payments in Nigeria looks incredibly promising. Several trends are shaping the landscape:

**Open Banking Initiatives**: The Central Bank of Nigeria's open banking framework will enable better integration between payment platforms, giving consumers more choices and better service.

**eNaira Expansion**: As the eNaira gains adoption, it will create new possibilities for instant, low-cost transactions across all payment categories.

**AI-Powered Personalization**: Future platforms will use artificial intelligence to predict payment patterns, suggest optimal timing, and even negotiate better rates automatically.

**Rural Connectivity**: Expanding internet infrastructure will bring digital payment access to previously underserved communities across Nigeria.

Platforms like Ruxx are well-positioned to capitalize on these trends, continuously evolving to meet the changing needs of Nigerian consumers.`;
}

function generateConclusionSection(topic) {
  const closing = pick(CONCLUDING_PHRASES);
  const action = pick(ACTION_VERBS);
  const topicLower = topic.toLowerCase();

  // Clean topic for natural phrasing
  let cleanTopic = topicLower
    .replace(/^pay\b\s*/i, "")
    .replace(/^buy\b\s*/i, "")
    .replace(/^sell\b\s*/i, "")
    .replace(/^use\b\s*/i, "")
    .replace(/^start\b\s*/i, "")
    .trim();

  return `## Final Thoughts

${closing}, the evolution of digital payments in Nigeria represents more than just technological progress — it reflects a fundamental shift in how people expect to interact with financial services.

${capitalize(pick(TRANSITIONS))}, by choosing a platform like Ruxx, you are not just adopting a tool; you are joining a movement toward more efficient, transparent, and accessible financial services for all Nigerians.

The question is no longer whether to ${action} digital payments, but rather which platform best suits your needs. With its comprehensive feature set, competitive pricing, and deep understanding of the Nigerian market, Ruxx makes that choice clear.

${capitalize(pick(ACTION_VERBS))} the change today and experience the difference that a truly local, truly digital payment platform can make.`;
}

function generateFAQSection(topic) {
  const topicLower = topic.toLowerCase();

  // Smart question phrasing
  let q1, q2;
  if (/gift card|trade|trading/i.test(topicLower)) {
    q1 = "How do I sell a gift card on Ruxx?";
    q2 = "What gift card brands does Ruxx support?";
  } else if (/electricity|power|meter/i.test(topicLower)) {
    q1 = "Which electricity distribution companies does Ruxx support?";
    q2 = "How do I buy an electricity token on Ruxx?";
  } else if (/airtime|data|recharge/i.test(topicLower)) {
    q1 = "Can I buy data bundles on Ruxx?";
    q2 = "Which networks are supported for airtime top-up?";
  } else if (/bet|betting|wallet/i.test(topicLower)) {
    q1 = "Which betting platforms can I fund through Ruxx?";
    q2 = "How long does a betting wallet funding take?";
  } else if (/dstv|gotv|star|cable|tv/i.test(topicLower)) {
    q1 = "How do I renew my DStv subscription on Ruxx?";
    q2 = "Does Ruxx support StarTimes and GOtv as well?";
  } else if (/pos|business/i.test(topicLower)) {
    q1 = "How much does it cost to start a POS business?";
    q2 = "What do I need to set up a POS terminal?";
  } else {
    q1 = "How long does a transaction take on Ruxx?";
    q2 = "Is Ruxx available across all Nigerian networks?";
  }

  const faqs = [
    {
      q: q1,
      a: "Most transactions are processed instantly. Electricity tokens and airtime top-ups are delivered within seconds, while gift card trades typically complete in under 2 minutes.",
    },
    {
      q: q2,
      a: "Yes. Ruxx supports all major Nigerian networks and service providers, ensuring you can complete virtually any payment from a single platform.",
    },
    {
      q: "What are the fees for using Ruxx?",
      a: "Ruxx offers competitive, transparent pricing with no hidden fees. You always see the exact amount before confirming any transaction.",
    },
    {
      q: "How do I fund my Ruxx wallet?",
      a: "You can fund your wallet through bank transfer to your unique virtual account number. Transfers are instant across all major Nigerian banks.",
    },
    {
      q: "Is my money safe on Ruxx?",
      a: "Absolutely. Ruxx uses Paystack as its payment processor, which employs 256-bit SSL encryption and is PCI-DSS compliant. Your financial data is never stored on our servers.",
    },
  ];

  return `## Frequently Asked Questions

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}`;
}

// ─── ARTICLE ASSEMBLER ───────────────────────────────────

/**
 * Topic-to-section mapping
 */
const TOPIC_SECTIONS = {
  default: [
    "intro", "problem", "solution", "howto", "comparison",
    "stats", "security", "future", "faq", "conclusion",
  ],
  quick: ["intro", "problem", "solution", "howto", "conclusion"],
  comprehensive: [
    "intro", "problem", "solution", "howto", "comparison",
    "stats", "security", "future", "faq", "conclusion",
  ],
};

/**
 * Generate a complete article from a topic and context
 */
export function generateArticle(topic, context, style = "default") {
  const sections = TOPIC_SECTIONS[style] || TOPIC_SECTIONS.default;

  const generators = {
    intro: () => generateIntroSection(topic, context),
    problem: () => generateProblemSection(topic),
    solution: () => generateSolutionSection(topic, context),
    howto: () => generateHowToSection(topic),
    stats: () => generateStatsSection(context),
    security: () => generateSecuritySection(),
    comparison: () => generateComparisonSection(topic),
    future: () => generateFutureSection(topic),
    faq: () => generateFAQSection(topic),
    conclusion: () => generateConclusionSection(topic),
  };

  const parts = sections.map((s) => generators[s]());
  return parts.join("\n\n");
}

/**
 * Generate an excerpt for an article
 */
export function generateExcerpt(topic) {
  const topicLower = topic.toLowerCase();

  // Smart phrasing based on topic type
  let actionPhrase;
  if (/^pay\b/.test(topicLower)) {
    actionPhrase = `pay your ${topicLower.replace(/^pay\s+/i, "")}`;
  } else if (/^buy\b/.test(topicLower)) {
    actionPhrase = `buy ${topicLower.replace(/^buy\s+/i, "")}`;
  } else if (/^sell\b/.test(topicLower)) {
    actionPhrase = `sell ${topicLower.replace(/^sell\s+/i, "")}`;
  } else if (/^use\b/.test(topicLower)) {
    actionPhrase = `use ${topicLower.replace(/^use\s+/i, "")}`;
  } else if (/^start\b/.test(topicLower)) {
    actionPhrase = `start ${topicLower.replace(/^start\s+/i, "")}`;
  } else if (/electricity|power|meter|token|bill/i.test(topicLower)) {
    actionPhrase = `pay your ${topicLower}`;
  } else if (/airtime|data|recharge|bundle/i.test(topicLower)) {
    actionPhrase = `buy ${topicLower}`;
  } else if (/gift card|trade|trading/i.test(topicLower)) {
    actionPhrase = `trade gift cards for Naira`;
  } else if (/dstv|gotv|star|cable|tv|subscription/i.test(topicLower)) {
    actionPhrase = `renew your ${topicLower}`;
  } else if (/bet|betting|wallet/i.test(topicLower)) {
    actionPhrase = `fund your ${topicLower}`;
  } else if (/pos|business/i.test(topicLower)) {
    actionPhrase = `start a ${topicLower}`;
  } else {
    actionPhrase = `manage ${topicLower} efficiently`;
  }

  const templates = [
    `Discover how to ${actionPhrase} in Nigeria. A comprehensive guide covering step-by-step instructions, benefits, and expert tips.`,
    `Learn everything you need to know about ${topicLower} in this detailed guide. From getting started to advanced tips, we cover it all.`,
    `A complete guide to ${topicLower} for Nigerian users. Find out how modern fintech solutions make the process faster, cheaper, and more convenient.`,
    `Looking to ${actionPhrase}? This comprehensive guide walks you through everything you need to know about digital payment solutions in Nigeria.`,
  ];
  return pick(templates);
}

/**
 * Generate article title variations
 */
export function generateTitle(topic) {
  // Clean up topic for better titles
  const clean = topic
    .replace(/^the\s+/i, "")
    .replace(/^a\s+/i, "")
    .replace(/^an\s+/i, "")
    .replace(/^how to\s+/i, "")
    .replace(/^guide to\s+/i, "")
    .trim();

  // Properly capitalize each word
  const capitalized = clean
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

  const templates = [
    `The Complete Guide to ${capitalized} in Nigeria`,
    `How to Master ${capitalized}: Everything You Need to Know`,
    `${capitalized} in 2026: A Comprehensive Guide`,
    `${capitalized}: The Nigerian Perspective`,
    `Your Ultimate Guide to ${capitalized}`,
    `A Practical Guide to ${capitalized} for Everyone`,
    `${capitalized}: Tips, Tricks, and Best Practices`,
    `Mastering ${capitalized} in Nigeria`,
  ];
  return pick(templates);
}

/**
 * Pick category based on topic
 */
export function pickCategory(topic) {
  const t = topic.toLowerCase();
  if (/gift\s*card|trade|sell|buy.*card/i.test(t)) return "Gift Cards";
  if (/airtime|data|bundle|recharge/i.test(t)) return "Payments";
  if (/electricity|power|meter|token/i.test(t)) return "Payments";
  if (/security|safe|protect|scam|fraud/i.test(t)) return "Technology";
  if (/fintech|startup|mobile money|banking/i.test(t)) return "Fintech";
  if (/bet|sport|betting/i.test(t)) return "Payments";
  if (/business|entrepreneur|pos/i.test(t)) return "Business";
  return pick(["Payments", "Fintech", "Technology", "Business"]);
}

export { pick, pickN, shuffle, capitalize, randomInt };
