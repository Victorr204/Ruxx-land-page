import { Star } from "lucide-react";
import { useTrust, aggregateTrust, formatCount, UNKNOWN_SOURCE } from "@/lib/useTrust";

/* ─── Compact badge for the hero trust row ───
   Shows the combined live rating across Google Play, the App Store and this
   site. Falls back to honest copy ("Ratings go live at launch") — never a
   made-up user count. */
export function HeroTrustBadge() {
  const { loading, data } = useTrust();
  const agg = aggregateTrust(data);

  let text;
  if (loading) {
    text = "Loading live ratings…";
  } else if (agg) {
    text = `from ${formatCount(agg.count)} reviews (${agg.labels.join(" · ")})`;
  } else {
    text = "Ratings go live at launch";
  }

  return (
    <div className="flex items-center text-[12px] text-muted-foreground" style={{ gap: "0.375rem" }}>
      <span style={{ color: "var(--primary)" }}>
        <Star style={{ width: "14px", height: "14px" }} />
      </span>
      {!loading && agg && (
        <span style={{ color: "var(--gold)", fontWeight: 700 }}>{agg.rating.toFixed(1)} ★</span>
      )}
      <span>{text}</span>
    </div>
  );
}

/* ─── Source icons ─── */
function PlayGlyph({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 1.33a1 1 0 010 1.724l-2.302 1.33-2.533-2.533 2.533-2.533zM5.864 3.458L16.8 9.79l-2.302 2.302-8.634-8.634z" />
    </svg>
  );
}

function AppleGlyph({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GlobeGlyph({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
    </svg>
  );
}

function SourceLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[12px] font-semibold inline-flex"
      style={{ color: "var(--primary)", gap: "0.25rem" }}
    >
      {children}
    </a>
  );
}

/* ─── One card per review source ─── */
function SourceCard({ name, icon, trust, loading, emptyNote, emptySub }) {
  const live = trust && trust.status === "live";
  const hasReviews = live && trust.count > 0;

  let body;
  if (loading) {
    body = (
      <div aria-hidden="true" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div style={{ width: "4.5rem", height: "1.75rem", borderRadius: "0.5rem", background: "var(--muted)" }} />
        <div style={{ width: "7rem", height: "0.875rem", borderRadius: "0.375rem", background: "var(--muted)" }} />
      </div>
    );
  } else if (hasReviews) {
    body = (
      <>
        <div className="flex items-baseline" style={{ gap: "0.375rem" }}>
          <Star style={{ width: "18px", height: "18px", color: "var(--gold)", fill: "var(--gold)" }} />
          <span className="text-2xl font-black text-foreground">{trust.rating.toFixed(1)}</span>
          <span className="text-[12px]" style={{ color: "var(--muted-foreground)" }}>/ 5</span>
        </div>
        <div className="text-[13px] font-semibold" style={{ color: "var(--foreground)" }}>
          {formatCount(trust.count)} {trust.count === 1 ? "review" : "reviews"}
        </div>
        {trust.url && <SourceLink href={trust.url}>View listing →</SourceLink>}
      </>
    );
  } else if (live) {
    body = (
      <>
        <div className="text-[15px] font-bold" style={{ color: "var(--foreground)" }}>No ratings yet</div>
        <div className="text-[12px]" style={{ color: "var(--muted-foreground)" }}>
          Just launched — be among the first to rate.
        </div>
        {trust.url && <SourceLink href={trust.url}>Open listing →</SourceLink>}
      </>
    );
  } else {
    body = (
      <>
        <div className="text-[15px] font-bold" style={{ color: "var(--foreground)" }}>{emptyNote}</div>
        <div className="text-[12px]" style={{ color: "var(--muted-foreground)" }}>{emptySub}</div>
      </>
    );
  }

  return (
    <div className="rounded-2xl p-5 border" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
      <div className="flex items-center mb-3" style={{ gap: "0.5rem" }}>
        <span style={{ color: "var(--primary)" }}>{icon}</span>
        <span className="text-[12px] font-bold tracking-wide uppercase" style={{ color: "var(--muted-foreground)" }}>
          {name}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>{body}</div>
    </div>
  );
}

/* ─── Live ratings strip: Google Play · App Store · Website ─── */
export default function TrustRatings() {
  const { loading, data } = useTrust();

  const play = (data && data.playStore) || UNKNOWN_SOURCE;
  const ios = (data && data.appStore) || UNKNOWN_SOURCE;
  const web = (data && data.web) || UNKNOWN_SOURCE;

  return (
    <div className="grid sm:grid-cols-3 gap-4" style={{ marginBottom: "2rem" }}>
      <SourceCard
        name="Google Play"
        icon={<PlayGlyph />}
        trust={play}
        loading={loading}
        emptyNote="Not listed yet"
        emptySub="Live rating appears here as soon as the app is published."
      />
      <SourceCard
        name="App Store"
        icon={<AppleGlyph />}
        trust={ios}
        loading={loading}
        emptyNote="Not listed yet"
        emptySub="Live rating appears here as soon as the app is published."
      />
      <SourceCard
        name="Website reviews"
        icon={<GlobeGlyph />}
        trust={web}
        loading={loading}
        emptyNote="No reviews yet"
        emptySub="Approved reviews show up right here — leave the first one below."
      />
    </div>
  );
}
