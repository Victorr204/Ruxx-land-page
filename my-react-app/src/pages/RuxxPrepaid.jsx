import { motion } from "framer-motion";
import { Smartphone, Wifi, Tv, Zap, Gamepad2, ShieldCheck, Check, ChevronDown, ChevronLeft, ChevronRight, Repeat, CalendarClock, Gauge, Lock, Tag, CirclePause, Eye, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import RegulatoryNotice from "@/components/RegulatoryNotice";
import { AppDownloadButton } from "@/components/ComingSoon";

import img1 from "@/assets/images/img1.jpg";
import img2 from "@/assets/images/img2.jpg";
import img3 from "@/assets/images/img3.jpg";
import img4 from "@/assets/images/img4.jpg";
import img5 from "@/assets/images/img5.jpg";
import img6 from "@/assets/images/img6.jpg";
import img7 from "@/assets/images/img7.jpg";
import img8 from "@/assets/images/img8.jpg";
import img9 from "@/assets/images/img9.jpg";
import img10 from "@/assets/images/img10.jpg";
import img11 from "@/assets/images/img11.jpg";
import img12 from "@/assets/images/img12.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 } }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];

export default function RuxxPrepaid() {
  const [faqOpen, setFaqOpen] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!emblaApi || paused) return;
    const timer = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => clearInterval(timer);
  }, [emblaApi, paused]);

  const services = [
    { icon: <Wifi className="w-5 h-5" />, title: "Airtime & Data", desc: "Top up all networks — MTN, Airtel, Glo, 9Mobile. Instant delivery, best rates." },
    { icon: <Tv className="w-5 h-5" />, title: "TV Subscriptions", desc: "DStv, GOtv, StarTimes — subscribe directly from your phone in seconds." },
    { icon: <Zap className="w-5 h-5" />, title: "Electricity", desc: "Prepaid meter tokens for IKEDC, EKEDC, KEDCO, and all major distribution companies." },
    { icon: <Gamepad2 className="w-5 h-5" />, title: "Betting & Gaming", desc: "Top up Bet9ja, Sportybet, and other bookmaker accounts instantly from the app." },
    { icon: <Smartphone className="w-5 h-5" />, title: "Collection Account", desc: "Your personal Paystack-powered collection account for instant top-ups, 24/7." },
  ];

  const autopayFeatures = [
    { icon: <CalendarClock className="w-5 h-5" />, title: "Five ways to schedule", desc: "Once, daily, weekly, monthly or every N days/minutes. Runs at the exact time you pick, in your timezone (WAT)." },
    { icon: <Gauge className="w-5 h-5" />, title: "You set the limits", desc: "Per-run, daily and monthly caps. Nothing spends beyond them, ever." },
    { icon: <Lock className="w-5 h-5" />, title: "PIN-authorized", desc: "Every flow is approved with your 4-digit PIN, and changing any money limit requires your PIN again." },
    { icon: <Tag className="w-5 h-5" />, title: "Price protection", desc: "If a provider's price changes, your flow pauses instead of overcharging you. Choose strict (exact price) or auto (within your own % tolerance)." },
    { icon: <CirclePause className="w-5 h-5" />, title: "Built-in safety stops", desc: "Auto-pause after 3 failed runs, on low balance, or on provider issues. Fund your wallet and paused flows resume automatically." },
    { icon: <Eye className="w-5 h-5" />, title: "Full transparency", desc: "See your next 7 days of runs and spend, get a reminder 10 minutes before each charge, and review every run in your history." },
    { icon: <SlidersHorizontal className="w-5 h-5" />, title: "Pause, edit or stop anytime", desc: "Full control in one tap. Stopping a flow revokes its authorization instantly." },
    { icon: <ShieldCheck className="w-5 h-5" />, title: "Safe by design", desc: "Verified accounts only, recipient details checked before money moves, and automatic refunds to your wallet if anything goes wrong." },
  ];

  const autopayPricing = [
    { title: "1% Auto-Pay fee", desc: "On amounts of ₦1,000 and above — free below ₦1,000." },
    { title: "Electricity +5% · TV +₦100", desc: "Applied per top-up on prepaid meter units and TV subscriptions." },
    { title: "Preview before you pay", desc: "Every charge is shown as \"₦X per run (incl. fees)\" before you confirm." },
    { title: "₦50 – ₦500,000", desc: "Per purchase, with up to 5 active flows at a time." },
  ];

  const faqs = [
    { q: "How do I add credit?", a: "Every user gets a personal collection account powered by Paystack. Transfer to the account number shown in your app, and your prepaid balance reflects instantly." },
    { q: "Can I withdraw or transfer my balance out?", a: "No. Prepaid credits are closed-loop utility credit. They can only be spent on airtime, data, electricity, TV and other services inside the app — they cannot be sent to a bank account or another user." },
    { q: "What are the fees?", a: "A flat 1.5% service fee on every top-up. For amounts above ₦10,000, an additional ₦50 VAT applies. No hidden charges." },
    { q: "What if my transaction fails?", a: "Failed transactions are automatically credited back to your prepaid balance immediately or within 24 hours. Contact support anytime for assistance." },
    { q: "What can I automate with Auto-Pay?", a: "Airtime, mobile data, TV subscriptions, prepaid electricity and betting top-ups." },
    { q: "Do I need to verify my account for Auto-Pay?", a: "Yes — Auto-Pay (MyFlow) runs purchases from your wallet, so it's available on verified (KYC) accounts. Verify once and you're in." },
    { q: "What does Auto-Pay cost?", a: "A 1% Auto-Pay fee on amounts of ₦1,000 and above — free below ₦1,000. Electricity adds +5% and TV adds +₦100 per top-up. Every charge is previewed as \"₦X per run (incl. fees)\" before you confirm." },
    { q: "What if my balance runs out?", a: "Your flow pauses and notifies you. Top up your wallet and it resumes automatically." },
    { q: "Can I stop a scheduled payment?", a: "Any time. Pause one flow, pause all of them, or stop it permanently — before the next run." },
    { q: "Will Auto-Pay charge me twice?", a: "No. Each scheduled run can only be charged once, and any duplicate or failed charge is refunded to your wallet." },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(faq => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a
          }
        }))
      }) }} />
      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 1 }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--hero-gradient)", transition: "background 0.3s" }} />
        <div style={{ maxWidth: "80rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "1rem", paddingRight: "1rem", position: "relative", zIndex: 10, textAlign: "center" }}>
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full border border-primary/20" style={{ padding: "0.375rem 0.875rem", marginBottom: "1.5rem" }}>
              <Smartphone className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] font-semibold text-primary" style={{ letterSpacing: "0.05em" }}>Ruxx Prepaid</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground" style={{ letterSpacing: "-0.025em", lineHeight: 1.15 }}>
              Every bill.<br />
              <span className="gradient-text">One app.</span>
            </h1>
            <p className="mt-6 text-muted-foreground mx-auto" style={{ maxWidth: "28rem", lineHeight: 1.6 }}>
              Airtime, data, TV, electricity, betting — utility top-ups delivered instantly from your phone.
            </p>
            <div className="flex flex-wrap justify-center" style={{ gap: "0.75rem", marginTop: "2rem" }}>
              <AppDownloadButton store="android" style={{ padding: "0.875rem 1.75rem" }}>
                <Smartphone className="w-4 h-4" /> Get Ruxx Prepaid
              </AppDownloadButton>
            </div>
            <p className="text-[12px] text-muted-foreground" style={{ marginTop: "1rem" }}>
              Pay and use only — balances are non-withdrawable prepaid utility credit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-12 md:py-20 lg:py-28">
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

      {/* AUTO-PAY (MYFLOW) */}
      <section id="auto-pay" className="relative py-12 md:py-20 lg:py-28 overflow-hidden">
        <div className="dot-grid" style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--hero-gradient)", transition: "background 0.3s" }} />
        <div style={{ maxWidth: "72rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "1rem", paddingRight: "1rem", position: "relative", zIndex: 10 }}>
          <motion.div variants={fadeUp} style={{ textAlign: "center", maxWidth: "44rem", marginLeft: "auto", marginRight: "auto" }}>
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full border border-primary/20" style={{ padding: "0.375rem 0.875rem", marginBottom: "1.5rem" }}>
              <Repeat className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] font-semibold text-primary" style={{ letterSpacing: "0.05em" }}>Auto-Pay · MyFlow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground" style={{ letterSpacing: "-0.025em", lineHeight: 1.15 }}>
              Set it. Fund it.<br />
              <span className="gradient-text">Let it flow.</span>
            </h2>
            <p className="mt-5 text-muted-foreground" style={{ lineHeight: 1.6 }}>
              Automate your airtime, data, TV, electricity and betting top-ups — on time, every time.
            </p>
            <p className="mt-3 text-[13px] text-muted-foreground mx-auto" style={{ maxWidth: "38rem", lineHeight: 1.7 }}>
              Never buy airtime again. Build a flow once and Ruxx buys it for you — daily, weekly, monthly, or every few days — straight from your wallet. No reminders to set, no deadlines to miss, no expired subscriptions.
            </p>
            <div className="flex flex-wrap justify-center" style={{ gap: "0.75rem", marginTop: "1.75rem" }}>
              <AppDownloadButton store="android" style={{ padding: "0.875rem 1.75rem" }}>
                <Smartphone className="w-4 h-4" /> Set up a flow
              </AppDownloadButton>
            </div>
          </motion.div>

          {/* HOW AUTO-PAY WORKS */}
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginTop: "4rem" }}>
            <h3 className="text-2xl md:text-3xl font-black text-foreground" style={{ letterSpacing: "-0.025em" }}>
              How Auto-Pay <span className="gradient-text">works</span>
            </h3>
          </motion.div>
          <div className="grid md:grid-cols-3" style={{ gap: "1.25rem", marginTop: "2rem" }}>
            {[
              { num: "01", title: "Pick what to buy", desc: "Airtime, data, DSTV/GOtv, prepaid meter units or a betting wallet — and who gets it." },
              { num: "02", title: "Schedule it", desc: "Once, Daily, Weekly (choose weekdays), Monthly (choose dates) or Interval (every N days). Add a start and end date if you like." },
              { num: "03", title: "Fund your wallet and relax", desc: "We charge you on schedule, notify you before every run, and show you exactly what happened in your history." },
            ].map((step, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}
                className="rounded-2xl border text-left"
                style={{ padding: "1.5rem", background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                <div className="font-black text-primary/20" style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{step.num}</div>
                <h4 className="font-bold text-foreground" style={{ fontSize: "1rem", marginBottom: "0.375rem" }}>{step.title}</h4>
                <p className="text-[13px] text-muted-foreground" style={{ lineHeight: 1.6 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* AUTO-PAY FEATURES */}
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginTop: "4rem" }}>
            <h3 className="text-2xl md:text-3xl font-black text-foreground" style={{ letterSpacing: "-0.025em" }}>
              Built-in <span className="gradient-text">controls</span>
            </h3>
          </motion.div>
          <div className="grid sm:grid-cols-2" style={{ gap: "1.25rem", marginTop: "2rem" }}>
            {autopayFeatures.map((f, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}
                className="rounded-2xl border flex items-start"
                style={{ gap: "1rem", padding: "1.25rem", background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary" style={{ flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <h4 className="font-bold text-foreground text-sm" style={{ marginBottom: "0.375rem" }}>{f.title}</h4>
                  <p className="text-[13px] text-muted-foreground" style={{ lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* PRICING */}
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginTop: "4rem" }}>
            <h3 className="text-2xl md:text-3xl font-black text-foreground" style={{ letterSpacing: "-0.025em" }}>
              Transparent <span className="gradient-text">pricing</span>
            </h3>
          </motion.div>
          <motion.div variants={fadeUp}
            className="rounded-3xl border"
            style={{ padding: "1.5rem", marginTop: "1.5rem", background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
            <div className="grid sm:grid-cols-2" style={{ gap: "1.25rem" }}>
              {autopayPricing.map((p, i) => (
                <div key={i} className="flex items-start" style={{ gap: "0.75rem" }}>
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary" style={{ flexShrink: 0, marginTop: "0.125rem" }}>
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground" style={{ marginBottom: "0.25rem" }}>{p.title}</div>
                    <p className="text-[13px] text-muted-foreground" style={{ lineHeight: 1.6 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-muted-foreground" style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid var(--border)", lineHeight: 1.6 }}>
              Auto-Pay (MyFlow) runs on verified (KYC) accounts only. Every flow is approved with your 4-digit PIN, and stopping a flow revokes its authorization instantly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-12 md:py-20 lg:py-28" style={{ background: "var(--section-alt)" }}>
        <div style={{ maxWidth: "64rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "1rem", paddingRight: "1rem" }}>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="text-3xl md:text-4xl font-black text-foreground" style={{ letterSpacing: "-0.025em" }}>
              How it <span className="gradient-text">works</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3" style={{ gap: "2rem", position: "relative" }}>
            <div className="hidden md:block" style={{ position: "absolute", top: "2rem", left: "20%", right: "20%", height: "1px", background: "var(--border)" }} />
            {[
              { num: "01", title: "Download", desc: "Get Ruxx Prepaid from Google Play or App Store." },
              { num: "02", title: "Top Up Balance", desc: "Credit your account via your personal Paystack collection account." },
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
            <div style={{ position: "relative" }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              <div ref={emblaRef} style={{ overflow: "hidden", borderRadius: "1rem", border: "1px solid var(--card-border)" }}>
                <div style={{ display: "flex" }}>
                  {images.map((src, idx) => (
                    <div key={idx} style={{ flex: "0 0 100%", minWidth: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--card-bg)" }}>
                      <img src={src} alt={`Ruxx Prepaid showcase ${idx + 1}`} width="1080" height="2400" loading="lazy" decoding="async" style={{ width: "100%", height: "auto", minHeight: "200px", maxHeight: "60vh", objectFit: "contain" }} />
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={scrollPrev} aria-label="Previous image"
                className="hidden sm:flex"
                style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", width: "2.5rem", height: "2.5rem", borderRadius: "50%", alignItems: "center", justifyContent: "center", border: "1px solid var(--card-border)", background: "var(--card-bg)", color: "var(--foreground)", backdropFilter: "blur(8px)", cursor: "pointer", transition: "all 0.2s" }}
                onMouseOver={(e) => e.currentTarget.style.background = "rgba(124,58,237,0.2)"}
                onMouseOut={(e) => e.currentTarget.style.background = "var(--card-bg)"}
              >
                <ChevronLeft style={{ width: "1.25rem", height: "1.25rem" }} />
              </button>
              <button onClick={scrollNext} aria-label="Next image"
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
      <section className="py-12 md:py-20 lg:py-28" style={{ background: "var(--section-alt)" }}>
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
                {["End-to-end encryption", "Automatic credit back on failed top-ups", "PCI-DSS compliant via Paystack", "No withdrawals or external transfers"].map((text, i) => (
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
              <h3 className="text-xl font-bold text-foreground" style={{ marginBottom: "0.75rem" }}>Your balance is protected</h3>
              <p className="text-sm text-muted-foreground" style={{ lineHeight: 1.6 }}>
                Ruxx Prepaid uses the same payment infrastructure trusted by thousands of businesses across Africa.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20 lg:py-28">
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
                   <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left" aria-expanded={faqOpen === i} aria-controls={`ruxxprepaid-faq-${i}`}>
                    <span className="text-sm font-semibold text-foreground" style={{ paddingRight: "1rem" }}>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${faqOpen === i ? "rotate-180" : ""}`} style={{ flexShrink: 0 }} />
                  </button>
                  {faqOpen === i && (
                    <div id={`ruxxprepaid-faq-${i}`} role="region" className="px-6 pb-4 text-[13px] text-muted-foreground border-t pt-3" style={{ lineHeight: 1.6, borderColor: "var(--border)" }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REGULATORY NOTICE */}
      <section className="py-12 md:py-20 lg:py-28" style={{ background: "var(--section-alt)" }}>
        <div style={{ maxWidth: "48rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "1rem", paddingRight: "1rem" }}>
          <motion.div variants={fadeUp}>
            <RegulatoryNotice variant="full" title="What Ruxx Prepaid is — and isn't" />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 lg:py-28" style={{ background: "var(--section-alt)" }}>
        <div style={{ maxWidth: "48rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "1rem", paddingRight: "1rem", textAlign: "center" }}>
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground" style={{ letterSpacing: "-0.025em", lineHeight: 1.15 }}>
              Start paying <span className="gradient-text">smarter today.</span>
            </h2>
            <div className="flex flex-wrap justify-center" style={{ gap: "0.75rem", marginTop: "2rem" }}>
              <AppDownloadButton store="android" style={{ padding: "0.875rem 2rem" }}>
                <Smartphone className="w-4 h-4" /> Download for Android
              </AppDownloadButton>
              <AppDownloadButton store="ios" variant="outline" style={{ padding: "0.875rem 2rem", borderColor: "var(--border)", color: "var(--foreground)" }}>
                <Smartphone className="w-4 h-4" /> Download for iOS
              </AppDownloadButton>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
