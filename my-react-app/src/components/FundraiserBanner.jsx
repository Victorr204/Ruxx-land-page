import { useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";

/* Crowdfunding page — where the "Donate" buttons send people */
export const DONATE_URL = "https://give.ruxxdigital.name.ng";

const DISMISS_KEY = "ruxx-fundraiser-bar-dismissed";

export default function FundraiserBanner() {
  const barRef = useRef(null);
  const [visible, setVisible] = useState(true);

  /* Respect a dismissal for this browsing session (same pattern as AdPopup) */
  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") setVisible(false);
    } catch {
      // storage unavailable — just show the bar
    }
  }, []);

  /* Publish the bar's height as CSS variables so the navbar sits directly
     below it and page content is pushed down by exactly the same amount. */
  useEffect(() => {
    const root = document.documentElement;

    if (!visible) {
      root.style.removeProperty("--site-banner-offset");
      root.style.removeProperty("--site-banner-space");
      return undefined;
    }

    const el = barRef.current;
    if (!el) return undefined;

    const apply = () => {
      const gap = 8; // 0.5rem of breathing room between the bar and the navbar
      const space = el.offsetHeight + gap;
      root.style.setProperty("--site-banner-space", `${space}px`);
      root.style.setProperty("--site-banner-offset", `calc(1rem + ${space}px)`);
    };
    apply();

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(apply) : null;
    if (ro) ro.observe(el);
    window.addEventListener("resize", apply);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, [visible]);

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // storage unavailable — still close for this page view
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      ref={barRef}
      className="fixed z-[60]"
      style={{
        top: "1rem",
        left: "1rem",
        right: "1rem",
        maxWidth: "80rem",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "0.5rem 0.75rem",
          padding: "0.5rem 2.5rem 0.5rem 1rem",
          borderRadius: "1rem",
          background: "linear-gradient(90deg, var(--primary) 0%, var(--gold) 100%)",
          color: "#FFFFFF",
          textAlign: "center",
          boxShadow: "0 10px 30px -12px rgba(124,58,237,0.55)",
        }}
      >
        <p style={{ fontSize: "13px", fontWeight: 600, lineHeight: 1.4, textShadow: "0 1px 2px rgba(0,0,0,0.15)" }}>
          <span className="hidden sm:inline">
            🚀 Ruxx Prepaid launches soon — we&apos;re &#8358;1.5M short of our goal.
          </span>
          <span className="sm:hidden">🚀 We&apos;re &#8358;1.5M short — help us launch.</span>
        </p>

        <a
          href={DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center shrink-0"
          style={{
            gap: "0.375rem",
            padding: "0.375rem 0.875rem",
            borderRadius: "0.625rem",
            background: "#FFFFFF",
            color: "var(--purple-dark)",
            fontSize: "12px",
            fontWeight: 800,
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
        >
          <span className="hidden sm:inline">Support with what you can</span>
          <span className="sm:hidden">Donate</span>
          <ArrowRight style={{ width: "13px", height: "13px" }} />
        </a>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss fundraising notice"
          style={{
            position: "absolute",
            top: "50%",
            right: "0.5rem",
            transform: "translateY(-50%)",
            width: "1.5rem",
            height: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,0.22)",
            color: "#FFFFFF",
            cursor: "pointer",
          }}
        >
          <X style={{ width: "13px", height: "13px" }} />
        </button>
      </div>
    </div>
  );
}
