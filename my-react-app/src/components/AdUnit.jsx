import { useEffect, useRef, useState } from "react";
import { ADSENSE_CLIENT, ADSENSE_SLOT, AD_CONSENT_EVENT, hasAdConsent } from "@/lib/adsense";

export default function AdUnit({ slot = ADSENSE_SLOT, className = "", style = {} }) {
  const [consented, setConsented] = useState(hasAdConsent);
  const pushed = useRef(false);

  useEffect(() => {
    if (!consented || pushed.current) return;
    pushed.current = true;
    const push = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        void error;
      }
    };
    if (window.adsbygoogle) {
      push();
    } else {
      const id = setInterval(() => {
        if (window.adsbygoogle) {
          clearInterval(id);
          push();
        }
      }, 250);
      setTimeout(() => clearInterval(id), 8000);
    }
  }, [consented]);

  useEffect(() => {
    const handler = () => setConsented(hasAdConsent());
    window.addEventListener(AD_CONSENT_EVENT, handler);
    return () => window.removeEventListener(AD_CONSENT_EVENT, handler);
  }, []);

  if (!consented || !slot) return null;

  return (
    <div className={className} style={{ minHeight: 90, margin: "1.5rem 0", ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}