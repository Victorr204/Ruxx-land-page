import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const UNKNOWN_SOURCE = { status: "unknown", rating: null, count: 0, url: null };

/* ─── Real ratings only — nothing here is hard-coded ───
   • playStore / appStore → backend /api/trust (live from Google Play + iTunes)
   • web                  → admin-approved reviews on this site
   If the backend hasn't been redeployed with /api/trust yet, we fall back to
   computing the website figure client-side from /api/reviews — still real data. */

export function formatCount(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

async function fetchTrust() {
  try {
    const res = await fetch(`${API_URL}/api/trust`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.web) return { ok: true, data };
    }
  } catch {
    // endpoint unavailable — fall through
  }

  try {
    const res = await fetch(`${API_URL}/api/reviews`);
    if (res.ok) {
      const { reviews = [] } = await res.json();
      const ratings = (reviews || [])
        .map((r) => parseInt(r.rating, 10))
        .filter((r) => r >= 1 && r <= 5);
      const count = ratings.length;
      const rating = count ? Math.round((ratings.reduce((a, b) => a + b, 0) / count) * 10) / 10 : null;
      return {
        ok: true,
        data: {
          web: { status: count > 0 ? "live" : "no_reviews", rating, count, url: null },
          playStore: UNKNOWN_SOURCE,
          appStore: UNKNOWN_SOURCE,
          fetchedAt: new Date().toISOString(),
        },
      };
    }
  } catch {
    // API unreachable
  }
  return { ok: false };
}

export function useTrust() {
  const [state, setState] = useState({ loading: true, data: null });

  useEffect(() => {
    let alive = true;
    fetchTrust().then((result) => {
      if (alive) setState({ loading: false, data: result.ok ? result.data : null });
    });
    return () => {
      alive = false;
    };
  }, []);

  return state;
}

/* Combined figure across every source that actually has reviews */
export function aggregateTrust(data) {
  if (!data) return null;
  const sources = [
    ["playStore", "Google Play"],
    ["appStore", "App Store"],
    ["web", "this site"],
  ]
    .map(([key, label]) => {
      const s = data[key];
      return s && s.status === "live" && s.count > 0 && s.rating ? { ...s, label } : null;
    })
    .filter(Boolean);

  if (!sources.length) return null;

  const count = sources.reduce((a, s) => a + s.count, 0);
  const rating = sources.reduce((a, s) => a + s.rating * s.count, 0) / count;
  return {
    rating: Math.round(rating * 10) / 10,
    count,
    labels: sources.map((s) => s.label),
  };
}
