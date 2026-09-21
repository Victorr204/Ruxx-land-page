const express = require("express");
const cors = require("cors");
const { Redis } = require("@upstash/redis");

const app = express();
const PORT = process.env.PORT || 3001;
const ADMIN_KEY = process.env.ADMIN_KEY || "ruxx-admin-key-change-in-production";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

app.use(cors());
app.use(express.json());

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
  if (key !== ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// Stats
app.get("/api/stats", async (req, res) => {
  try {
    const users = (await redis.get("stats:users")) || 0;
    const uptime = (await redis.get("stats:uptime")) || "99.9";
    res.json({ users: parseInt(users), uptime: parseFloat(uptime) });
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
