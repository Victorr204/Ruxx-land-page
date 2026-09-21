import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Smartphone, CreditCard, ShieldCheck, Zap, BadgeDollarSign,
  Headphones, ArrowRight, ChevronDown, Wifi, Tv, Bolt,
  CheckCircle2, Star, Users, TrendingUp, Globe,
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import Reviews from "@/components/Reviews";
import paystackLogo from "@/assets/images/paystack.png";
import paystackSvg from "@/assets/images/paystack-logo.svg";

const STATS_API = import.meta.env.VITE_STATS_API_URL;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const faqs = [
  { q: "What is Ruxx Digital Services?", a: "Ruxx Digital Services is a mobile payment platform built for Nigerians. We offer two core products — RuxxPay for everyday bill payments and Ruxx Card for gift card trading." },
  { q: "Is my money safe?", a: "Yes. All payments are processed through Paystack's PCI-compliant infrastructure with bank-grade encryption. Your funds are protected at every step." },
  { q: "What fees does Ruxx charge?", a: "Fees vary by product. RuxxPay charges a flat 1.5% on wallet deposits. Ruxx Card offers competitive rates updated daily. No hidden charges on either platform." },
  { q: "How do I get started?", a: "Download the app from Google Play or App Store, create an account, and fund your wallet. You can start using any of our services immediately." },
  { q: "How do I contact support?", a: "Reach us 24/7 via email at info@ruxxdigital.name.ng or through our in-app support chat." },
];

const marquee = [
  { icon: <Wifi className="w-4 h-4" />, text: "Airtime & Data" },
  { icon: <Tv className="w-4 h-4" />, text: "TV Subscriptions" },
  { icon: <Bolt className="w-4 h-4" />, text: "Electricity" },
  { icon: <CreditCard className="w-4 h-4" />, text: "Gift Cards" },
  { icon: <Smartphone className="w-4 h-4" />, text: "Betting" },
  { icon: <Wifi className="w-4 h-4" />, text: "Airtime & Data" },
  { icon: <Tv className="w-4 h-4" />, text: "TV Subscriptions" },
  { icon: <Bolt className="w-4 h-4" />, text: "Electricity" },
  { icon: <CreditCard className="w-4 h-4" />, text: "Gift Cards" },
  { icon: <Smartphone className="w-4 h-4" />, text: "Betting" },
];

export default function Home() {
  const [faqOpen, setFaqOpen] = useState(null);
  const [stats, setStats] = useState({ users: 0, uptime: 0 });

  useEffect(() => {
    if (!STATS_API) return;
    fetch(STATS_API)
      .then((r) => r.json())
      .then((data) => setStats({ users: data.users || 0, uptime: data.uptime || 99.9 }))
      .catch(() => {});
  }, []);

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Floating orbs */}
        <div style={{ position: "absolute", top: "10%", left: "-5%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "-8%", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

        <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--hero-gradient)", transition: "background 0.3s" }} />

        <div style={{ maxWidth: "80rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "1rem", paddingRight: "1rem", position: "relative", zIndex: 10 }}>
          <div className="max-w-3xl mx-auto text-center">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full" style={{ padding: "0.5rem 1.25rem", marginBottom: "1.5rem", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.5)" }} />
                <span className="text-sm font-bold" style={{ color: "var(--primary)", letterSpacing: "0.02em" }}>Ruxx Digital Services</span>
                <span style={{ color: "var(--muted-foreground)", fontSize: "12px" }}>—</span>
                <span className="text-[12px] font-medium" style={{ color: "var(--muted-foreground)" }}>A subsidiary of Kognatix Ltd</span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp} custom={1}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.08 }}
            >
              Smarter payments.
              <br />
              <span className="gradient-text">Zero stress.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp} custom={2}
              className="text-muted-foreground mx-auto"
              style={{ maxWidth: "28rem", marginTop: "1.5rem", lineHeight: 1.65, fontSize: "1rem" }}
            >
              One platform for all your digital payments. Buy airtime, pay bills,
              trade gift cards — fast, secure, and at the best rates in Nigeria.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap justify-center" style={{ gap: "0.75rem", marginTop: "2rem" }}>
              <Link
                to="/ruxxpay"
                className="inline-flex items-center gap-2 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                style={{ padding: "0.875rem 1.75rem", background: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                Explore RuxxPay <ArrowRight style={{ width: "16px", height: "16px" }} />
              </Link>
              <Link
                to="/ruxx-card"
                className="inline-flex items-center gap-2 rounded-xl text-sm font-medium transition-all hover:bg-muted"
                style={{ padding: "0.875rem 1.75rem", border: "1px solid var(--border)", color: "var(--foreground)" }}
              >
                Explore Ruxx Card
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap justify-center gap-3 md:gap-5 md:p-6" style={{ marginTop: "2.5rem" }}>
              {[
                { icon: <ShieldCheck style={{ width: "14px", height: "14px" }} />, text: "PCI-DSS Secure" },
                { icon: <CheckCircle2 style={{ width: "14px", height: "14px" }} />, text: "Instant Delivery" },
                { icon: <Star style={{ width: "14px", height: "14px" }} />, text: "Trusted by 1,000+ Users" },
              ].map((b, i) => (
                <div key={i} className="flex items-center text-[12px] text-muted-foreground" style={{ gap: "0.375rem" }}>
                  <span style={{ color: "var(--primary)" }}>{b.icon}</span> {b.text}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Gradient fade at bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(to top, var(--background) 0%, transparent 100%)" }} />
      </section>

      {/* ═══════════════════ MARQUEE ═══════════════════ */}
      <section className="py-3 md:py-4" style={{ overflow: "hidden", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--section-alt)" }}>
        <div style={{ display: "flex", width: "max-content", animation: "marquee 25s linear infinite" }}>
          {marquee.map((item, i) => (
            <div key={i} className="flex items-center text-sm font-medium text-muted-foreground" style={{ gap: "0.5rem", padding: "0 2rem", whiteSpace: "nowrap" }}>
              <span style={{ color: "var(--primary)" }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ STATS ═══════════════════ */}
      <section className="py-6 md:py-8" style={{ background: "var(--section-alt)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            {[
              { end: stats.users || 0, suffix: "+", label: "Active Users", icon: <Users style={{ width: "18px", height: "18px" }} /> },
              { end: 10, suffix: "s", label: "Avg. Transaction", icon: <Zap style={{ width: "18px", height: "18px" }} /> },
              { end: stats.uptime || 99, suffix: ".9%", label: "Uptime", icon: <TrendingUp style={{ width: "18px", height: "18px" }} /> },
              { end: 24, suffix: "/7", label: "Support", icon: <Globe style={{ width: "18px", height: "18px" }} /> },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}>
                <div className="flex justify-center mb-2" style={{ color: "var(--primary)" }}>{s.icon}</div>
                <div className="text-2xl md:text-3xl font-black text-foreground">
                  <AnimatedCounter end={s.end} suffix={s.suffix} duration={2000} />
                </div>
                <div className="text-[11px] text-muted-foreground font-medium mt-1 tracking-wide uppercase">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PRODUCTS ═══════════════════ */}
      <section className="py-12 md:py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-8 md:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full" style={{ padding: "0.25rem 0.75rem", marginBottom: "1rem", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.12)" }}>
              <span className="text-[10px] font-semibold text-primary tracking-wider uppercase">Our Products</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground" style={{ letterSpacing: "-0.025em" }}>
              Two powerful solutions,<br /><span className="gradient-text">one platform.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 md:p-6">
            {/* RuxxPay */}
            <motion.div variants={fadeUp}>
              <Link to="/ruxxpay" className="block rounded-3xl p-5 md:p-8 lg:p-10 border transition-all group" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)"}
                onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--card-border)"}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(124,58,237,0.1)", marginBottom: "1.5rem" }}>
                  <Smartphone className="w-7 h-7 text-primary" />
                </div>
                <div className="inline-flex items-center gap-2 rounded-full" style={{ padding: "0.25rem 0.625rem", marginBottom: "1rem", background: "rgba(124,58,237,0.08)" }}>
                  <span className="text-[10px] font-semibold text-primary tracking-wide">RuxxPay</span>
                </div>
                <h3 className="text-2xl font-black text-foreground mb-3" style={{ letterSpacing: "-0.02em" }}>Your wallet, supercharged.</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted-foreground)" }}>
                  Airtime, data, TV, electricity, betting — all your bill payments handled instantly from one app.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Airtime", "Data", "TV", "Electricity", "Betting"].map((tag) => (
                    <span key={tag} className="text-[11px] font-medium rounded-full px-2.5 py-0.5" style={{ background: "rgba(124,58,237,0.06)", color: "var(--primary)" }}>{tag}</span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>

            {/* Ruxx Card */}
            <motion.div variants={fadeUp} custom={1}>
              <Link to="/ruxx-card" className="block rounded-3xl p-5 md:p-8 lg:p-10 border transition-all group" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)"}
                onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--card-border)"}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(245,158,11,0.1)", marginBottom: "1.5rem" }}>
                  <CreditCard className="w-7 h-7 text-gold" />
                </div>
                <div className="inline-flex items-center gap-2 rounded-full" style={{ padding: "0.25rem 0.625rem", marginBottom: "1rem", background: "rgba(245,158,11,0.08)" }}>
                  <span className="text-[10px] font-semibold text-gold tracking-wide">Ruxx Card</span>
                </div>
                <h3 className="text-2xl font-black text-foreground mb-3" style={{ letterSpacing: "-0.02em" }}>Trade gift cards at the best rates.</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted-foreground)" }}>
                  Buy and sell gift cards from Apple, Amazon, Google, and more. Instant transactions, competitive rates.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Apple", "Amazon", "Google Play", "Steam"].map((tag) => (
                    <span key={tag} className="text-[11px] font-medium rounded-full px-2.5 py-0.5" style={{ background: "rgba(245,158,11,0.06)", color: "var(--gold)" }}>{tag}</span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm group-hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
      <section className="py-12 md:py-20 lg:py-28" style={{ background: "var(--section-alt)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-8 md:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full" style={{ padding: "0.25rem 0.75rem", marginBottom: "1rem", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.12)" }}>
              <span className="text-[10px] font-semibold text-primary tracking-wider uppercase">How It Works</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground" style={{ letterSpacing: "-0.025em" }}>
              One platform, <span className="gradient-text">endless possibilities.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* RuxxPay side */}
            <motion.div variants={fadeUp}>
              <Link to="/ruxxpay" className="block rounded-3xl p-8 border transition-all group" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)"}
                onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--card-border)"}
              >
                <div className="inline-flex items-center gap-2 rounded-full mb-5" style={{ padding: "0.25rem 0.625rem", background: "rgba(124,58,237,0.08)" }}>
                  <span className="text-[10px] font-semibold text-primary tracking-wide">RuxxPay</span>
                </div>
                <h3 className="text-xl font-black text-foreground mb-4">Pay bills in 3 steps</h3>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Fund your wallet", desc: "Transfer to your Paystack virtual account. Funds reflect instantly." },
                    { step: "2", title: "Pick a service", desc: "Airtime, data, TV, electricity, or betting — choose what you need." },
                    { step: "3", title: "Complete payment", desc: "Confirm and done. Transaction completes in under 10 seconds." },
                  ].map((s, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(124,58,237,0.1)" }}>
                        <span className="text-[11px] font-bold" style={{ color: "var(--primary)" }}>{s.step}</span>
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold" style={{ color: "var(--foreground)" }}>{s.title}</p>
                        <p className="text-[12px]" style={{ color: "var(--muted-foreground)" }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm mt-6 group-hover:gap-3 transition-all">
                  Explore RuxxPay <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>

            {/* Ruxx Card side */}
            <motion.div variants={fadeUp} custom={1}>
              <Link to="/ruxx-card" className="block rounded-3xl p-8 border transition-all group" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)"}
                onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--card-border)"}
              >
                <div className="inline-flex items-center gap-2 rounded-full mb-5" style={{ padding: "0.25rem 0.625rem", background: "rgba(245,158,11,0.08)" }}>
                  <span className="text-[10px] font-semibold text-gold tracking-wide">Ruxx Card</span>
                </div>
                <h3 className="text-xl font-black text-foreground mb-4">Trade cards in 3 steps</h3>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Submit your card", desc: "Enter card details and get an instant rate estimate." },
                    { step: "2", title: "Confirm the trade", desc: "Accept the rate. Send your gift card securely." },
                    { step: "3", title: "Get paid instantly", desc: "Naira hits your wallet the moment the card is verified." },
                  ].map((s, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(245,158,11,0.1)" }}>
                        <span className="text-[11px] font-bold" style={{ color: "var(--gold)" }}>{s.step}</span>
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold" style={{ color: "var(--foreground)" }}>{s.title}</p>
                        <p className="text-[12px]" style={{ color: "var(--muted-foreground)" }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm mt-6 group-hover:gap-3 transition-all">
                  Explore Ruxx Card <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURES ═══════════════════ */}
      <section className="py-12 md:py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-8 md:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full" style={{ padding: "0.25rem 0.75rem", marginBottom: "1rem", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.12)" }}>
              <span className="text-[10px] font-semibold text-primary tracking-wider uppercase">Why Choose Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground" style={{ letterSpacing: "-0.025em" }}>
              Built for <span className="gradient-text">Nigerians.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <ShieldCheck className="w-5 h-5" />, title: "Bank-Grade Security", desc: "PCI-DSS compliant. Every transaction encrypted end-to-end via Paystack.", color: "rgba(124,58,237,0.1)", iconColor: "var(--primary)" },
              { icon: <Zap className="w-5 h-5" />, title: "Lightning Fast", desc: "Transactions complete in under 10 seconds. No delays, no downtime.", color: "rgba(245,158,11,0.1)", iconColor: "var(--gold)" },
              { icon: <BadgeDollarSign className="w-5 h-5" />, title: "Best Rates", desc: "Transparent pricing with no hidden fees. You always know what you pay.", color: "rgba(34,197,94,0.1)", iconColor: "#22c55e" },
              { icon: <Headphones className="w-5 h-5" />, title: "24/7 Support", desc: "Real humans ready to help anytime via email or in-app chat.", color: "rgba(59,130,246,0.1)", iconColor: "#3b82f6" },
              { icon: <TrendingUp className="w-5 h-5" />, title: "99.9% Uptime", desc: "Our infrastructure is built for reliability. Your payments never stop.", color: "rgba(168,85,247,0.1)", iconColor: "#a855f7" },
              { icon: <Globe className="w-5 h-5" />, title: "Built for Nigeria", desc: "Designed specifically for Nigerian payment needs. Local solutions, global standards.", color: "rgba(236,72,153,0.1)", iconColor: "#ec4899" },
            ].map((f, i) => (
              <motion.div
                key={i} variants={fadeUp} custom={i}
                className="rounded-2xl p-5 md:p-6 border transition-all"
                style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--card-border)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: f.color, color: f.iconColor }}>{f.icon}</div>
                <h3 className="font-bold text-foreground text-sm mb-1.5">{f.title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PAYSTACK ═══════════════════ */}
      <section className="py-12 md:py-20 lg:py-28" style={{ background: "var(--section-alt)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4" style={{ letterSpacing: "-0.025em" }}>
                Secured & Powered by <span style={{ color: "#00C853" }}>Paystack</span>
              </h2>
              <p className="text-muted-foreground mb-6" style={{ lineHeight: 1.6 }}>
                Every transaction is processed through Paystack's PCI-DSS Level 1 compliant
                infrastructure. Your card details are encrypted with 256-bit SSL and never
                touch our servers.
              </p>
              <div className="space-y-2 mb-6">
                {[
                  "PCI-DSS Level 1 compliant",
                  "256-bit SSL encryption",
                  "Real-time fraud detection",
                  "Instant refund on failed transactions",
                ].map((text, i) => (
                  <div key={i} className="flex items-center text-[13px]" style={{ gap: "0.5rem", color: "var(--muted-foreground)" }}>
                    <CheckCircle2 style={{ width: "14px", height: "14px", color: "#00C853", flexShrink: 0 }} /> {text}
                  </div>
                ))}
              </div>
              <Link to="/paystack"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                style={{ color: "#00C853" }}
              >
                Learn more about our security <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} custom={1}>
              <div className="rounded-3xl p-8 border" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                <div className="flex items-center gap-4 mb-6">
                  <img src={paystackSvg} alt="Paystack" style={{ width: "48px", height: "48px" }} />
                  <div>
                    <div className="font-bold text-foreground">Paystack</div>
                    <div className="text-[11px]" style={{ color: "#00C853" }}>Verified Payment Partner</div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Transaction Security", value: "256-bit SSL" },
                    { label: "Compliance", value: "PCI-DSS Level 1" },
                    { label: "Fraud Protection", value: "Real-time AI" },
                    { label: "Uptime SLA", value: "99.99%" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "var(--border)" }}>
                      <span className="text-[13px]" style={{ color: "var(--muted-foreground)" }}>{item.label}</span>
                      <span className="text-[13px] font-semibold" style={{ color: "var(--foreground)" }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="mt-8">
            <img src={paystackLogo} alt="Paystack Banner" style={{ width: "100%", maxWidth: "36rem", margin: "0 auto", display: "block", borderRadius: "1rem", border: "1px solid var(--card-border)" }} />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ REVIEWS ═══════════════════ */}
      <section className="py-12 md:py-20 lg:py-28" style={{ background: "var(--section-alt)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-8 md:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full" style={{ padding: "0.25rem 0.75rem", marginBottom: "1rem", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.12)" }}>
              <span className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: "var(--gold)" }}>What Users Say</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground" style={{ letterSpacing: "-0.025em" }}>
              Loved by <span className="gradient-text">thousands.</span>
            </h2>
          </motion.div>

          <Reviews />
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section className="py-12 md:py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full" style={{ padding: "0.25rem 0.75rem", marginBottom: "1rem", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.12)" }}>
              <span className="text-[10px] font-semibold text-primary tracking-wider uppercase">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground" style={{ letterSpacing: "-0.025em" }}>
              Questions?
            </h2>
            <p className="mt-3 text-sm" style={{ color: "var(--muted-foreground)" }}>
              We've got answers.{" "}
              <Link to="/contact" className="text-primary font-medium hover:underline">Contact us</Link> if you need more.
            </p>
          </motion.div>

          <div>
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} style={{ marginBottom: "0.5rem" }}>
                <div className="rounded-xl border overflow-hidden" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                  <button
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                    aria-expanded={faqOpen === i}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="text-sm font-semibold text-foreground" style={{ paddingRight: "1rem" }}>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${faqOpen === i ? "rotate-180" : ""}`} />
                  </button>
                  {faqOpen === i && (
                    <div
                      id={`faq-answer-${i}`}
                      role="region"
                      className="px-6 pb-4 text-[13px] leading-relaxed border-t pt-3"
                      style={{ color: "var(--muted-foreground)", borderColor: "var(--border)" }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="py-12 md:py-20 lg:py-28" style={{ background: "var(--section-alt)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground" style={{ letterSpacing: "-0.03em", lineHeight: 1.15, position: "relative" }}>
              Ready to start<br />
              <span className="gradient-text">paying smarter?</span>
            </h2>
            <p className="mt-4 max-w-md mx-auto" style={{ color: "var(--muted-foreground)", position: "relative" }}>
              Join thousands of Nigerians already using Ruxx Digital Services.
            </p>
            <div className="flex flex-wrap justify-center" style={{ gap: "0.75rem", marginTop: "2rem", position: "relative" }}>
              <Link
                to="/ruxxpay"
                className="inline-flex items-center gap-2 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                style={{ padding: "0.875rem 2rem", background: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                Get Started <ArrowRight style={{ width: "16px", height: "16px" }} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl text-sm font-medium transition-all hover:bg-muted"
                style={{ padding: "0.875rem 2rem", border: "1px solid var(--border)", color: "var(--foreground)" }}
              >
                Contact Support
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
