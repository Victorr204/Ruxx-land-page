import { useState, useEffect } from "react";
import { Star, ExternalLink, MessageSquare, Send } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const PLAY_STORE_APP_ID = "com.ruxx.pay";
const APP_STORE_ID = "6738738145";

function StarRating({ rating, onRate, interactive = false }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-0.5" role={interactive ? "radiogroup" : "img"} aria-label={`Rating: ${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${interactive ? "cursor-pointer" : ""}`}
          style={{
            color: i < (hover || rating) ? "var(--gold)" : "var(--border)",
            fill: i < (hover || rating) ? "var(--gold)" : "none",
          }}
          onMouseEnter={() => interactive && setHover(i + 1)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onRate(i + 1)}
          role={interactive ? "radio" : undefined}
          aria-checked={interactive ? i + 1 === rating : undefined}
          tabIndex={interactive ? 0 : undefined}
          onKeyDown={(e) => {
            if (interactive && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              onRate(i + 1);
            }
          }}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div
      className="rounded-2xl p-5 border"
      style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
    >
      <div className="flex items-center justify-between mb-2">
        <StarRating rating={review.rating} />
        <span className="text-[10px] font-medium" style={{ color: "var(--muted-foreground)" }}>
          {new Date(review.created_at).toLocaleDateString()}
        </span>
      </div>
      <p className="text-[13px] leading-relaxed mb-3" style={{ color: "var(--muted-foreground)" }}>
        "{review.text}"
      </p>
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
          style={{ background: "rgba(124,58,237,0.1)", color: "var(--primary)" }}
        >
          {review.author.charAt(0).toUpperCase()}
        </div>
        <span className="text-[11px] font-medium" style={{ color: "var(--foreground)" }}>
          {review.author}
        </span>
        {review.source && (
          <span
            className="text-[9px] font-semibold rounded-full px-1.5 py-0.5"
            style={{
              background: review.source === "Google Play" ? "rgba(34,197,94,0.1)" :
                         review.source === "App Store" ? "rgba(59,130,246,0.1)" :
                         "rgba(168,85,247,0.1)",
              color: review.source === "Google Play" ? "#22c55e" :
                    review.source === "App Store" ? "#3b82f6" :
                    "#a855f7",
            }}
          >
            {review.source}
          </span>
        )}
      </div>
    </div>
  );
}

function ReviewForm({ onSubmitted }) {
  const [form, setForm] = useState({ author: "", rating: 5, text: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "website" }),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ author: "", rating: 5, text: "" });
        if (onSubmitted) onSubmitted();
      }
    } catch {
      // API not available
    }
    setSubmitting(false);
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: "rgba(34,197,94,0.1)" }}>
          <Send className="w-5 h-5" style={{ color: "#22c55e" }} />
        </div>
        <p className="text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>Review submitted!</p>
        <p className="text-[13px]" style={{ color: "var(--muted-foreground)" }}>It will appear after admin approval.</p>
        <button onClick={() => setSuccess(false)} className="text-[12px] font-medium mt-3" style={{ color: "var(--primary)" }}>
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl p-6 border" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
      <h4 className="text-sm font-bold mb-4" style={{ color: "var(--foreground)" }}>Leave a Review</h4>
      <div className="mb-3">
        <label htmlFor="review-name" className="text-[11px] font-medium block mb-1" style={{ color: "var(--muted-foreground)" }}>Your Name</label>
        <input
          id="review-name"
          type="text"
          required
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          className="w-full rounded-lg px-3 py-2 text-[13px] border outline-none"
          style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="review-rating" className="text-[11px] font-medium block mb-1" style={{ color: "var(--muted-foreground)" }}>Rating</label>
        <StarRating rating={form.rating} onRate={(r) => setForm({ ...form, rating: r })} interactive />
      </div>
      <div className="mb-4">
        <label htmlFor="review-text" className="text-[11px] font-medium block mb-1" style={{ color: "var(--muted-foreground)" }}>Your Review</label>
        <textarea
          id="review-text"
          required
          rows={3}
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          className="w-full rounded-lg px-3 py-2 text-[13px] border outline-none resize-none"
          style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}
          placeholder="Tell us about your experience..."
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg py-2.5 text-[13px] font-semibold transition-all hover:opacity-90 disabled:opacity-50"
        style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/api/reviews`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews || []);
      }
    } catch {
      // API not available
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const playStoreUrl = `https://play.google.com/store/apps/details?id=${PLAY_STORE_APP_ID}`;
  const appStoreUrl = `https://apps.apple.com/app/id${APP_STORE_ID}`;

  return (
    <div>
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-2 text-[13px]" style={{ color: "var(--muted-foreground)" }}>
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Loading reviews...
          </div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-10">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(124,58,237,0.08)" }}>
            <MessageSquare className="w-7 h-7" style={{ color: "var(--primary)" }} />
          </div>
          <p className="text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>Be the first to review</p>
          <p className="text-[13px] mb-5" style={{ color: "var(--muted-foreground)" }}>
            Share your experience or rate us on your favorite store.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {reviews.slice(0, 6).map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      )}

      {/* Submit review form */}
      <div className="max-w-md mx-auto mb-8">
        <ReviewForm onSubmitted={fetchReviews} />
      </div>

      {/* Store links */}
      <div className="text-center">
        <p className="text-[11px] font-medium mb-3" style={{ color: "var(--muted-foreground)" }}>Or rate us on</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={playStoreUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] font-semibold rounded-xl px-5 py-2.5 transition-all hover:opacity-90"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 1.33a1 1 0 010 1.724l-2.302 1.33-2.533-2.533 2.533-2.533zM5.864 3.458L16.8 9.79l-2.302 2.302-8.634-8.634z" />
            </svg>
            Play Store
            <ExternalLink className="w-3 h-3" />
          </a>
          <a href={appStoreUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] font-semibold rounded-xl px-5 py-2.5 transition-all hover:opacity-90"
            style={{ background: "var(--foreground)", color: "var(--background)" }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            App Store
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
