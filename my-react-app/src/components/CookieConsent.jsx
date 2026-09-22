import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";
import { AD_CONSENT_EVENT } from "@/lib/adsense";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("ruxx-cookie-consent");
    if (consent === "accepted") updateConsent(true);
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const notify = () => window.dispatchEvent(new Event(AD_CONSENT_EVENT));

  const updateConsent = (granted) => {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: granted ? "granted" : "denied",
        analytics_storage: granted ? "granted" : "denied",
      });
    }
  };

  const accept = () => {
    localStorage.setItem("ruxx-cookie-consent", "accepted");
    updateConsent(true);
    setShow(false);
    notify();
  };

  const decline = () => {
    localStorage.setItem("ruxx-cookie-consent", "declined");
    updateConsent(false);
    setShow(false);
    notify();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div
            className="max-w-4xl mx-auto rounded-2xl border p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 backdrop-blur-xl"
            style={{
              background: "color-mix(in srgb, var(--card-bg) 90%, transparent)",
              borderColor: "var(--card-border)",
              boxShadow: "0 -4px 30px rgba(0,0,0,0.1)",
            }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(124,58,237,0.1)" }}>
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground mb-1">We value your privacy</p>
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                We use cookies to enhance your experience and analyze site traffic. By clicking "Accept", you consent to our use of cookies.{" "}
                <a href="/privacy" className="text-primary font-medium hover:underline">Privacy Policy</a>
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={decline}
                className="px-4 py-2.5 rounded-xl text-xs font-medium border btn-press transition-all hover:bg-muted"
                style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:opacity-90 btn-press transition-all"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
