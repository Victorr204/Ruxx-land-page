const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { Redis } = require("@upstash/redis");

const app = express();
const PORT = process.env.PORT || 3001;

function cleanEnv(v) {
  if (!v) return v;
  return v.replace(/^["']|["']$/g, "").trim();
}

const ADMIN_KEY = cleanEnv(process.env.ADMIN_KEY);
if (!ADMIN_KEY || ADMIN_KEY.length < 16) {
  console.error("ADMIN_KEY environment variable is required (min 16 characters). Refusing to start.");
  process.exit(1);
}

const redisUrl = cleanEnv(process.env.UPSTASH_REDIS_REST_URL);
const redisToken = cleanEnv(process.env.UPSTASH_REDIS_REST_TOKEN);

const redis = new Redis({
  url: redisUrl,
  token: redisToken,
});

app.use(cors());
app.use(express.json());
app.set("trust proxy", 1);

// Rate limiting
const RATE_LIMIT_WINDOW = 60;
const RATE_LIMIT_MAX = 30;

async function checkRateLimit(ip) {
  const key = `ratelimit:${ip}`;
  const current = await redis.incr(key);
  if (current === 1) {
    await redis.expire(key, RATE_LIMIT_WINDOW);
  }
  return current <= RATE_LIMIT_MAX;
}

function requireAdmin(req, res, next) {
  const key = req.headers["x-admin-key"];
  if (!key || typeof key !== "string" || !ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const a = Buffer.from(key);
  const b = Buffer.from(ADMIN_KEY);
  const mismatch = a.length !== b.length || !crypto.timingSafeEqual(a, b);
  if (mismatch) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// Stats
app.get("/api/stats", async (req, res) => {
  try {
    const seed = (await redis.get("stats:seed")) || 0;
    const visitors = await redis.scard("visitor:ips");
    const uptime = (await redis.get("stats:uptime")) || "99.9";
    res.json({ users: visitors + parseInt(seed), uptime: parseFloat(uptime) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Track unique visitor
app.post("/api/track-visit", async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip || "unknown";
    const hash = crypto.createHash("sha256").update(ip).digest("hex");
    await redis.sadd("visitor:ips", hash);
    const seed = (await redis.get("stats:seed")) || 0;
    const visitors = await redis.scard("visitor:ips");
    const uptime = (await redis.get("stats:uptime")) || "99.9";
    res.json({ success: true, users: visitors + parseInt(seed), uptime: parseFloat(uptime) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: set stats seed (app downloads base number)
app.post("/api/stats/set", requireAdmin, async (req, res) => {
  const { seed } = req.body;
  if (seed === undefined || seed === null) return res.status(400).json({ error: "Seed number required" });
  try {
    await redis.set("stats:seed", parseInt(seed));
    const visitors = await redis.scard("visitor:ips");
    res.json({ success: true, users: visitors + parseInt(seed) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register user
app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Name and email required" });
  try {
    const existing = await redis.get(`user:${email}`);
    if (!existing) {
      await redis.set(`user:${email}`, JSON.stringify({ name, email, created_at: new Date().toISOString() }));
      await redis.incr("stats:users");
    }
    const count = (await redis.get("stats:users")) || 0;
    res.json({ success: true, users: parseInt(count) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit review
app.post("/api/reviews", async (req, res) => {
  const ip = req.ip;
  const allowed = await checkRateLimit(ip);
  if (!allowed) return res.status(429).json({ error: "Too many requests. Please try again later." });

  const { author, rating, text, source } = req.body;
  if (!author || !rating || !text) return res.status(400).json({ error: "Author, rating, and text required" });
  try {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const review = { id, author, rating: parseInt(rating), text, source: source || "website", approved: 0, created_at: new Date().toISOString() };
    await redis.set(`review:${id}`, JSON.stringify(review));
    const reviewIds = (await redis.get("review:ids")) || [];
    reviewIds.unshift(id);
    await redis.set("review:ids", JSON.stringify(reviewIds));
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get approved reviews (public)
app.get("/api/reviews", async (req, res) => {
  try {
    const reviewIds = (await redis.get("review:ids")) || [];
    const reviews = [];
    for (const id of reviewIds) {
      const review = await redis.get(`review:${id}`);
      if (review && review.approved === 1) {
        reviews.push(review);
      }
      if (reviews.length >= 10) break;
    }
    res.json({ reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: get all reviews
app.get("/api/reviews/all", requireAdmin, async (req, res) => {
  try {
    const reviewIds = (await redis.get("review:ids")) || [];
    const reviews = [];
    for (const id of reviewIds) {
      const review = await redis.get(`review:${id}`);
      if (review) reviews.push(review);
    }
    res.json({ reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: approve review
app.put("/api/reviews/:id/approve", requireAdmin, async (req, res) => {
  try {
    const review = await redis.get(`review:${req.params.id}`);
    if (review) {
      review.approved = 1;
      await redis.set(`review:${req.params.id}`, JSON.stringify(review));
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: delete review
app.delete("/api/reviews/:id", requireAdmin, async (req, res) => {
  try {
    await redis.del(`review:${req.params.id}`);
    const reviewIds = (await redis.get("review:ids")) || [];
    const updated = reviewIds.filter((id) => id !== req.params.id);
    await redis.set("review:ids", JSON.stringify(updated));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Trust: live ratings from Google Play, App Store and website reviews ───
const GOOGLE_PLAY_PACKAGE = cleanEnv(process.env.GOOGLE_PLAY_PACKAGE);
const APP_STORE_ID = cleanEnv(process.env.APP_STORE_ID);
const TRUST_CACHE_KEY = "trust:data";
const TRUST_CACHE_TTL = 6 * 3600; // 6 hours

const STORE_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

function round1(n) {
  return Math.round(n * 10) / 10;
}

/* Website: average rating + count of ADMIN-APPROVED reviews (real data) */
async function getWebTrust() {
  const reviewIds = (await redis.get("review:ids")) || [];
  let count = 0;
  let total = 0;
  for (const id of reviewIds.slice(0, 500)) {
    const review = await redis.get(`review:${id}`);
    const rating = review && parseInt(review.rating, 10);
    if (review && review.approved === 1 && rating >= 1 && rating <= 5) {
      total += rating;
      count += 1;
    }
  }
  return {
    status: count > 0 ? "live" : "no_reviews",
    rating: count > 0 ? round1(total / count) : null,
    count,
    url: null,
  };
}

/* Google Play: scraped server-side (no CORS, cached in Redis) */
async function getPlayStoreTrust() {
  if (!GOOGLE_PLAY_PACKAGE) return { status: "not_listed", rating: null, count: 0, url: null };
  const url = `https://play.google.com/store/apps/details?id=${encodeURIComponent(GOOGLE_PLAY_PACKAGE)}&hl=en_US`;
  try {
    const res = await fetch(url, {
      headers: { "user-agent": STORE_UA, "accept-language": "en-US,en;q=0.9" },
      redirect: "follow",
    });
    if (res.status === 404) return { status: "not_listed", rating: null, count: 0, url };
    if (!res.ok) return { status: "unknown", rating: null, count: 0, url };

    const html = await res.text();
    const value = html.match(/"ratingValue"\s*:\s*"([\d.]+)"/);
    const count = html.match(/"ratingCount"\s*:\s*"(\d+)"/);

    if (!value && !count) {
      // Page exists but has no aggregate rating block → app not (yet) published
      if (/Sorry, the requested URL was not found|<title>Not Found/i.test(html)) {
        return { status: "not_listed", rating: null, count: 0, url };
      }
      return { status: "live", rating: null, count: 0, url };
    }
    return {
      status: "live",
      rating: value ? round1(parseFloat(value[1])) : null,
      count: count ? parseInt(count[1], 10) : 0,
      url,
    };
  } catch (err) {
    console.error("trust: google play fetch failed:", err.message);
    return { status: "unknown", rating: null, count: 0, url };
  }
}

/* App Store: official iTunes Lookup API (public, no key needed) */
async function getAppStoreTrust() {
  if (!APP_STORE_ID) return { status: "not_listed", rating: null, count: 0, url: null };
  const url = `https://itunes.apple.com/lookup?id=${encodeURIComponent(APP_STORE_ID)}&country=ng`;
  try {
    const res = await fetch(url, { headers: { "user-agent": STORE_UA } });
    if (!res.ok) return { status: "unknown", rating: null, count: 0, url: null };
    const data = await res.json();
    const app = data && data.results && data.results[0];
    if (!app) return { status: "not_listed", rating: null, count: 0, url: null };
    return {
      status: "live",
      rating: typeof app.averageUserRating === "number" ? round1(app.averageUserRating) : null,
      count: app.userRatingCount || 0,
      url: app.trackViewUrl || null,
    };
  } catch (err) {
    console.error("trust: app store lookup failed:", err.message);
    return { status: "unknown", rating: null, count: 0, url: null };
  }
}

app.get("/api/trust", async (req, res) => {
  try {
    const cached = await redis.get(TRUST_CACHE_KEY);
    if (cached) {
      const parsed = typeof cached === "string" ? JSON.parse(cached) : cached;
      if (parsed && parsed.web) return res.json({ ...parsed, cached: true });
    }

    const [web, playStore, appStore] = await Promise.all([
      getWebTrust(),
      getPlayStoreTrust(),
      getAppStoreTrust(),
    ]);

    const payload = { web, playStore, appStore, fetchedAt: new Date().toISOString() };
    await redis.set(TRUST_CACHE_KEY, JSON.stringify(payload), { ex: TRUST_CACHE_TTL });
    res.json(payload);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get("/api/health", async (req, res) => {
  try {
    await redis.ping();
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

module.exports = app;
