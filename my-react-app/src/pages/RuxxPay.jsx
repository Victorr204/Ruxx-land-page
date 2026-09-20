import { motion } from "framer-motion";
import { Smartphone, Wifi, Tv, Zap, Gamepad2, CreditCard, ShieldCheck, Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

import img1 from "@/assets/images/img1.jpg";
import img2 from "@/assets/images/img2.jpg";
import img3 from "@/assets/images/img3.jpg";
import img4 from "@/assets/images/img4.jpg";
import img5 from "@/assets/images/img5.jpg";
import img6 from "@/assets/images/img6.jpg";
import img7 from "@/assets/images/img7.jpg";
import img8 from "@/assets/images/img8.jpg";
import img9 from "@/assets/images/img9.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 } }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

export default function RuxxPay() {
  const [faqOpen, setFaqOpen] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const timer = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => clearInterval(timer);
  }, [emblaApi]);

  const services = [
    { icon: <Wifi className="w-5 h-5" />, title: "Airtime & Data", desc: "Top up all networks — MTN, Airtel, Glo, 9Mobile. Instant delivery, best rates." },
    { icon: <Tv className="w-5 h-5" />, title: "TV Subscriptions", desc: "DStv, GOtv, StarTimes — subscribe directly from your phone in seconds." },
    { icon: <Zap className="w-5 h-5" />, title: "Electricity", desc: "Prepaid meter tokens for IKEDC, EKEDC, KEDCO, and all major distribution companies." },
    { icon: <Gamepad2 className="w-5 h-5" />, title: "Betting & Gaming", desc: "Fund Bet9ja, Sportybet, and other bookmaker wallets instantly from the app." },
    { icon: <CreditCard className="w-5 h-5" />, title: "Gift Cards", desc: "Purchase and redeem gift cards from Apple, Amazon, Google Play, and more." },
    { icon: <Smartphone className="w-5 h-5" />, title: "Virtual Accounts", desc: "Your personal Paystack PVA for 24/7 deposits. Funds reflect instantly." },
  ];

  const faqs = [
    { q: "How do I fund my wallet?", a: "Every user gets a permanent Paystack virtual account. Simply transfer to the account number shown in your app, and funds reflect instantly." },
    { q: "What are the fees?", a: "A flat 1.5% service fee on every deposit. For amounts above ₦10,000, an additional ₦50 VAT applies. No hidden charges." },
    { q: "What if my transaction fails?", a: "Failed transactions are refunded immediately or within 24 hours. Contact support anytime for assistance." },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      {/* HERO */}
      <section className="relative pt-20 pb-10 md:pt-32 md:pb-16 overflow-hidden">
        <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 1 }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--hero-gradient)", transition: "background 0.3s" }} />
        <div style={{ maxWidth: "80rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "1rem", paddingRight: "1rem", position: "relative", zIndex: 10, textAlign: "center" }}>
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full border border-primary/20" style={{ padding: "0.375rem 0.875rem", marginBottom: "1.5rem" }}>
              <Smartphone className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] font-semibold text-primary" style={{ letterSpacing: "0.05em" }}>RuxxPay</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground" style={{ letterSpacing: "-0.025em", lineHeight: 1.15 }}>
              Every bill.<br />
              <span className="gradient-text">One app.</span>
            </h1>
            <p className="mt-6 text-muted-foreground mx-auto" style={{ maxWidth: "28rem", lineHeight: 1.6 }}>
              Airtime, data, TV, electricity, betting — handled instantly from your phone.
            </p>
            <div className="flex flex-wrap justify-center" style={{ gap: "0.75rem", marginTop: "2rem" }}>
              <a href="https://play.google.com/store/apps/details?id=com.ruxx.pay" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:opacity-90 transition-all"
                style={{ padding: "0.875rem 1.75rem" }}>
                <Smartphone className="w-4 h-4" /> Get RuxxPay
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "3rem 0" }}>
        <div style={{ maxWidth: "72rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "1rem", paddingRight: "1rem" }}>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="text-3xl md:text-4xl font-black text-foreground" style={{ letterSpacing: "-0.025em" }}>
              Services <span className="gradient-text">included</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "1.25rem", maxWidth: "64rem", marginLeft: "auto", marginRight: "auto" }}>
            {services.map((s, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}
                className="rounded-2xl border transition-colors hover:border-primary/20"
                style={{ padding: "1.5rem", background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary" style={{ marginBottom: "1rem" }}>{s.icon}</div>
                <h3 className="font-bold text-foreground text-sm" style={{ marginBottom: "0.375rem" }}>{s.title}</h3>
                <p className="text-[13px] text-muted-foreground" style={{ lineHeight: 1.6 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "3rem 0", background: "var(--section-alt)" }}>
        <div style={{ maxWidth: "64rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "1rem", paddingRight: "1rem" }}>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="text-3xl md:text-4xl font-black text-foreground" style={{ letterSpacing: "-0.025em" }}>
              How it <span className="gradient-text">works</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3" style={{ gap: "2rem", position: "relative" }}>
            <div className="hidden md:block" style={{ position: "absolute", top: "2rem", left: "20%", right: "20%", height: "1px", background: "var(--border)" }} />
            {[
              { num: "01", title: "Download", desc: "Get RuxxPay from Google Play or App Store." },
              { num: "02", title: "Fund Wallet", desc: "Use your personal Paystack virtual account." },
              { num: "03", title: "Pay for Anything", desc: "Airtime, data, TV, electricity, betting." },
            ].map((step, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} style={{ textAlign: "center", position: "relative" }}>
                <div className="font-black text-primary/10" style={{ fontSize: "2rem", marginBottom: "1rem" }}>{step.num}</div>
                <h3 className="font-bold text-foreground" style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>{step.title}</h3>
                <p className="text-[13px] text-muted-foreground mx-auto" style={{ maxWidth: "16rem" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWCASE CAROUSEL */}
      <section style={{ padding: "3rem 0" }}>
        <div style={{ maxWidth: "64rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "1rem", paddingRight: "1rem" }}>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="text-3xl md:text-4xl font-black text-foreground" style={{ letterSpacing: "-0.025em" }}>
              See it in <span className="gradient-text">action</span>
            </h2>
          </motion.div>
          <motion.div variants={fadeUp}>
            <div style={{ position: "relative" }}>
              <div ref={emblaRef} style={{ overflow: "hidden", borderRadius: "1rem", border: "1px solid var(--card-border)" }}>
                <div style={{ display: "flex" }}>
                  {images.map((src, idx) => (
                    <div key={idx} style={{ flex: "0 0 100%", minWidth: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--card-bg)" }}>
                      <img src={src} alt={`RuxxPay showcase ${idx + 1}`} style={{ width: "100%", height: "60vh", minHeight: "300px", maxHeight: "600px", objectFit: "contain" }} />
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={scrollPrev}
                className="hidden sm:flex"
                style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", width: "2.5rem", height: "2.5rem", borderRadius: "50%", alignItems: "center", justifyContent: "center", border: "1px solid var(--card-border)", background: "var(--card-bg)", color: "var(--foreground)", backdropFilter: "blur(8px)", cursor: "pointer", transition: "all 0.2s" }}
                onMouseOver={(e) => e.currentTarget.style.background = "rgba(124,58,237,0.2)"}
                onMouseOut={(e) => e.currentTarget.style.background = "var(--card-bg)"}
              >
                <ChevronLeft style={{ width: "1.25rem", height: "1.25rem" }} />
              </button>
              <button onClick={scrollNext}
                className="hidden sm:flex"
                style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", width: "2.5rem", height: "2.5rem", borderRadius: "50%", alignItems: "center", justifyContent: "center", border: "1px solid var(--card-border)", background: "var(--card-bg)", color: "var(--foreground)", backdropFilter: "blur(8px)", cursor: "pointer", transition: "all 0.2s" }}
                onMouseOver={(e) => e.currentTarget.style.background = "rgba(124,58,237,0.2)"}
                onMouseOut={(e) => e.currentTarget.style.background = "var(--card-bg)"}
              >
                <ChevronRight style={{ width: "1.25rem", height: "1.25rem" }} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECURITY */}
      <section style={{ padding: "3rem 0", background: "var(--section-alt)" }}>
        <div style={{ maxWidth: "72rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "1rem", paddingRight: "1rem" }}>
          <div className="grid lg:grid-cols-2" style={{ gap: "1.5rem", alignItems: "center", maxWidth: "64rem", marginLeft: "auto", marginRight: "auto" }}>
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-black text-foreground" style={{ letterSpacing: "-0.025em", marginBottom: "1rem" }}>
                Security is<br /><span className="gradient-text">non-negotiable.</span>
              </h2>
              <p className="text-muted-foreground" style={{ lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Every transaction is encrypted end-to-end through Paystack's PCI-compliant infrastructure.
              </p>
              <div>
                {["Bank-grade encryption", "Instant refund on failed transactions", "PCI-DSS compliant via Paystack", "24/7 dispute resolution"].map((text, i) => (
                  <div key={i} className="flex items-center text-sm text-muted-foreground" style={{ gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <Check className="w-4 h-4 text-primary" style={{ flexShrink: 0 }} /> {text}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} custom={1}
              className="rounded-3xl border"
              style={{ padding: "2rem", background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary" style={{ marginBottom: "1.25rem" }}>
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground" style={{ marginBottom: "0.75rem" }}>Your funds are protected</h3>
              <p className="text-sm text-muted-foreground" style={{ lineHeight: 1.6 }}>
                RuxxPay uses the same security infrastructure trusted by thousands of businesses across Africa.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "3rem 0" }}>
        <div style={{ maxWidth: "48rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "1rem", paddingRight: "1rem" }}>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 className="text-3xl md:text-4xl font-black text-foreground" style={{ letterSpacing: "-0.025em" }}>FAQ</h2>
            <p className="mt-2 text-muted-foreground text-sm">
              <Link to="/contact" className="text-primary hover:underline">Need help?</Link>
            </p>
          </motion.div>
          <div>
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} style={{ marginBottom: "0.5rem" }}>
                <div className="rounded-xl border overflow-hidden" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left">
                    <span className="text-sm font-semibold text-foreground" style={{ paddingRight: "1rem" }}>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${faqOpen === i ? "rotate-180" : ""}`} style={{ flexShrink: 0 }} />
                  </button>
                  {faqOpen === i && (
                    <div className="px-6 pb-4 text-[13px] text-muted-foreground border-t pt-3" style={{ lineHeight: 1.6, borderColor: "var(--border)" }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "3rem 0", background: "var(--section-alt)" }}>
        <div style={{ maxWidth: "48rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "1rem", paddingRight: "1rem", textAlign: "center" }}>
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground" style={{ letterSpacing: "-0.025em", lineHeight: 1.15 }}>
              Start paying <span className="gradient-text">smarter today.</span>
            </h2>
            <div className="flex flex-wrap justify-center" style={{ gap: "0.75rem", marginTop: "2rem" }}>
              <a href="https://play.google.com/store/apps/details?id=com.ruxx.pay" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:opacity-90 transition-all"
                style={{ padding: "0.875rem 2rem" }}>
                <Smartphone className="w-4 h-4" /> Download for Android
              </a>
              <a href="https://apps.apple.com/app/id6738738145" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border rounded-xl text-sm font-medium transition-all hover:bg-muted"
                style={{ padding: "0.875rem 2rem", borderColor: "var(--border)", color: "var(--foreground)" }}>
                <Smartphone className="w-4 h-4" /> Download for iOS
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
