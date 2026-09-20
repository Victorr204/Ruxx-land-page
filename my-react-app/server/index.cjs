const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const dbPath = path.join(__dirname, "ruxx.db");

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
    text TEXT NOT NULL,
    source TEXT DEFAULT 'website',
    approved INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS stats (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);

const insertUser = db.prepare("INSERT OR IGNORE INTO users (name, email) VALUES (?, ?)");
const insertReview = db.prepare("INSERT INTO reviews (author, rating, text, source) VALUES (?, ?, ?, ?)");
const getUserCount = db.prepare("SELECT COUNT(*) as count FROM users");
const getApprovedReviews = db.prepare("SELECT * FROM reviews WHERE approved = 1 ORDER BY created_at DESC LIMIT ?");
const getAllReviews = db.prepare("SELECT * FROM reviews ORDER BY created_at DESC");
const approveReview = db.prepare("UPDATE reviews SET approved = 1 WHERE id = ?");
const deleteReview = db.prepare("DELETE FROM reviews WHERE id = ?");
const getStat = db.prepare("SELECT value FROM stats WHERE key = ?");
const setStat = db.prepare("INSERT OR REPLACE INTO stats (key, value) VALUES (?, ?)");

// Seed stats
const uptimeRow = getStat.get("uptime");
if (!uptimeRow) setStat.run("uptime", "99.9");

app.use(cors());
app.use(express.json());

// Stats endpoint
app.get("/api/stats", (req, res) => {
  const users = getUserCount.get();
  const uptime = getStat.get("uptime");
  res.json({
    users: users.count,
    uptime: parseFloat(uptime?.value || "99.9"),
  });
});

// Register user
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Name and email required" });
  try {
    insertUser.run(name, email);
    const count = getUserCount.get();
    res.json({ success: true, users: count.count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit review
app.post("/api/reviews", (req, res) => {
  const { author, rating, text, source } = req.body;
  if (!author || !rating || !text) return res.status(400).json({ error: "Author, rating, and text required" });
  try {
    const result = insertReview.run(author, rating, text, source || "website");
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get approved reviews (public)
app.get("/api/reviews", (req, res) => {
  const reviews = getApprovedReviews.all(10);
  res.json({ reviews });
});

// Admin: get all reviews
app.get("/api/reviews/all", (req, res) => {
  const reviews = getAllReviews.all();
  res.json({ reviews });
});

// Admin: approve review
app.put("/api/reviews/:id/approve", (req, res) => {
  approveReview.run(req.params.id);
  res.json({ success: true });
});

// Admin: delete review
app.delete("/api/reviews/:id", (req, res) => {
  deleteReview.run(req.params.id);
  res.json({ success: true });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Ruxx API running on http://localhost:${PORT}`);
});
