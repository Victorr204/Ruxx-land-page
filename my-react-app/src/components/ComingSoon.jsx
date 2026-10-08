import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, X } from "lucide-react";

const ComingSoonContext = createContext(null);

const copy = {
  android: {
    title: "Coming soon on Google Play",
    body: "The Ruxx app hasn't launched yet. We're putting the finishing touches on it — stay tuned.",
  },
  ios: {
    title: "Coming soon on the App Store",
    body: "The Ruxx app hasn't launched yet. We're putting the finishing touches on it — stay tuned.",
  },
  default: {
    title: "Coming soon",
    body: "The Ruxx app hasn't launched yet. We're putting the finishing touches on it — stay tuned.",
  },
};

export function ComingSoonProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [store, setStore] = useState("default");

  const show = useCallback((nextStore = "default") => {
    setStore(nextStore in copy ? nextStore : "default");
    setOpen(true);
  }, []);
  const hide = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") hide();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, hide]);

  const text = copy[store] || copy.default;

  return (
    <ComingSoonContext.Provider value={{ show, hide }}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[300] flex items-center justify-center"
            style={{ padding: "1rem", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={hide}
            role="dialog"
            aria-modal="true"
            aria-label={text.title}
          >
            <motion.div
              className="rounded-3xl border w-full"
              style={{ maxWidth: "24rem", padding: "2rem", position: "relative", background: "var(--card-bg)", borderColor: "var(--card-border)", boxShadow: "0 24px 60px -20px rgba(0,0,0,0.4)" }}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" onClick={hide} aria-label="Close"
                className="absolute"
                style={{ top: "0.875rem", right: "0.875rem", width: "2rem", height: "2rem", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "1px solid var(--card-border)", background: "var(--card-bg)", color: "var(--muted-foreground)", cursor: "pointer" }}>
                <X className="w-4 h-4" />
              </button>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary" style={{ marginBottom: "1.25rem" }}>
                <Smartphone className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-foreground" style={{ letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>{text.title}</h3>
              <p className="text-sm text-muted-foreground" style={{ lineHeight: 1.6 }}>{text.body}</p>
              <button type="button" onClick={hide}
                className="w-full bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:opacity-90 transition-all"
                style={{ padding: "0.75rem 1.5rem", marginTop: "1.5rem" }}>
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ComingSoonContext.Provider>
  );
}

function useComingSoon() {
  const ctx = useContext(ComingSoonContext);
  if (!ctx) throw new Error("useComingSoon must be used inside a ComingSoonProvider");
  return ctx;
}

export function AppDownloadButton({ children, store = "default", variant = "primary", className = "", style, ...rest }) {
  const { show } = useComingSoon();
  const variants = {
    primary: "text-sm bg-primary text-primary-foreground font-bold hover:opacity-90",
    outline: "text-sm border font-medium hover:bg-muted",
    plain: "text-[13px] font-semibold hover:opacity-90",
  };

  return (
    <button
      type="button"
      onClick={() => show(store)}
      className={`inline-flex items-center justify-center gap-2 rounded-xl transition-all cursor-pointer ${variants[variant] || variants.primary} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
}
