import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const AD_SRC = "/advert-banner.png";
const DISMISS_KEY = "ruxx-ad-popup-dismissed";

function isDismissed() {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    sessionStorage.setItem(DISMISS_KEY, "1");
  } catch {
    // storage unavailable — still close for this page view
  }
}

export default function AdPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isDismissed()) return undefined;

    let cancelled = false;
    let timer;
    const show = () => {
      if (!cancelled) setOpen(true);
    };

    // Show once the banner is ready, but never wait longer than 2.5s
    const fallback = setTimeout(show, 2500);
    const img = new Image();
    img.onload = () => {
      clearTimeout(fallback);
      timer = setTimeout(show, 400);
    };
    img.src = AD_SRC;

    return () => {
      cancelled = true;
      clearTimeout(fallback);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const dismiss = () => {
    markDismissed();
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[250] flex items-center justify-center"
          style={{ padding: "1rem", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={dismiss}
          role="dialog"
          aria-modal="true"
          aria-label="Advertisement"
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
              alignItems: "center",
              width: "min(22rem, calc(100vw - 2rem), calc(78vh * 768 / 1366))",
            }}
          >
            <div style={{ position: "relative", width: "100%" }}>
              <img
                src={AD_SRC}
                alt="Ruxx Prepaid — your all-in-one utility and bill payment hub"
                width="768"
                height="1366"
                decoding="async"
                style={{ display: "block", width: "100%", height: "auto", borderRadius: "1rem", boxShadow: "0 30px 70px -20px rgba(0,0,0,0.7)" }}
              />
              <button
                type="button"
                onClick={dismiss}
                aria-label="Close advertisement"
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
            <p
              className="text-center"
              style={{ marginTop: "0.625rem", fontSize: "11px", letterSpacing: "0.05em", color: "rgba(255,255,255,0.65)" }}
            >
              AD · TAP ANYWHERE TO CLOSE
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
