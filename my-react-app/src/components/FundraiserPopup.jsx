import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, HeartHandshake } from "lucide-react";
import adBanner from "@/assets/images/ruxx-prepaid-advert.webp";
import { DONATE_URL } from "@/components/FundraiserBanner";
import { isFundraiserPopupPending, markFundraiserPopupDone } from "@/lib/popupQueue";

export default function FundraiserPopup() {
  const [open, setOpen] = useState(false);

  /* Closing hands priority over to AdPopup (see lib/popupQueue) */
  const close = () => {
    markFundraiserPopupDone();
    setOpen(false);
  };

  /* Show once per session, as soon as the banner is ready (1.5s fallback) */
  useEffect(() => {
    if (!isFundraiserPopupPending()) return undefined; // already seen this session

    let cancelled = false;
    let fallback;
    let timer;
    const show = () => {
      if (!cancelled) setOpen(true);
    };

    fallback = setTimeout(show, 1500);
    const img = new Image();
    img.onload = () => {
      clearTimeout(fallback);
      timer = setTimeout(show, 350);
    };
    img.src = adBanner;

    return () => {
      cancelled = true;
      clearTimeout(fallback);
      clearTimeout(timer);
    };
  }, []);

  /* Escape + scroll lock while open */
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        markFundraiserPopupDone();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[260] flex items-center justify-center"
          style={{ padding: "1rem", background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Ruxx Prepaid launch fundraiser"
        >
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              width: "min(44rem, calc(100vw - 2rem))",
            }}
          >
            {/* Banner */}
            <div style={{ position: "relative" }}>
              <img
                src={adBanner}
                alt="Ruxx Digital Services — all your everyday digital services in one place"
                width="1672"
                height="941"
                decoding="async"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  borderRadius: "1rem",
                  boxShadow: "0 30px 70px -20px rgba(0,0,0,0.75)",
                }}
              />
              <button
                type="button"
                onClick={close}
                aria-label="Close fundraiser notice"
                style={{
                  position: "absolute",
                  top: "-0.75rem",
                  right: "-0.75rem",
                  width: "2.25rem",
                  height: "2.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.7)",
                  background: "rgba(0,0,0,0.75)",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Call to action */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center text-center"
              style={{
                gap: "0.75rem",
                marginTop: "0.75rem",
                padding: "0.875rem 1rem",
                borderRadius: "1rem",
                background: "linear-gradient(90deg, rgba(124,58,237,0.12), rgba(245,158,11,0.14))",
                border: "1px solid var(--card-border)",
              }}
            >
              <p
                className="flex items-center justify-center"
                style={{ gap: "0.5rem", fontSize: "13px", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.45 }}
              >
                <HeartHandshake style={{ width: "15px", height: "15px", color: "var(--gold)", flexShrink: 0 }} />
                <span>
                  We&apos;re <strong>&#8358;1,500,000 (≈ $1,000)</strong> short of launching Ruxx Prepaid —
                  support with what you can.
                </span>
              </p>

              <div className="flex items-center shrink-0" style={{ gap: "0.5rem" }}>
                <a
                  href={DONATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="inline-flex items-center whitespace-nowrap"
                  style={{
                    gap: "0.375rem",
                    padding: "0.625rem 1.125rem",
                    borderRadius: "0.75rem",
                    background: "var(--primary)",
                    color: "var(--primary-foreground)",
                    fontSize: "13px",
                    fontWeight: 800,
                    textDecoration: "none",
                  }}
                >
                  Donate now <ArrowRight style={{ width: "14px", height: "14px" }} />
                </a>
                <button
                  type="button"
                  onClick={close}
                  style={{
                    padding: "0.625rem 0.875rem",
                    borderRadius: "0.75rem",
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--muted-foreground)",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Later
                </button>
              </div>
            </div>

            <p
              className="text-center"
              style={{ marginTop: "0.5rem", fontSize: "10px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.6)" }}
            >
              LAUNCH CAMPAIGN · TAP OUTSIDE TO CLOSE
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
