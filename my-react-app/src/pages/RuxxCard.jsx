import { motion } from "framer-motion";
import { CreditCard, Smartphone, ShieldCheck, Zap, TrendingUp, ArrowRight, Check, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 } }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function RuxxCard() {
  const [faqOpen, setFaqOpen] = useState(null);
  const brands = ["Apple", "Amazon", "Google Play", "Steam", "Netflix", "Spotify", "eBay", "PlayStation", "Xbox", "Visa", "Mastercard", "Vanilla"];

  const faqs = [
    { q: "How do I sell a gift card?", a: "Select the card brand, enter the card details, and confirm. Payment is sent to your wallet within minutes." },
    { q: "What rates do you offer?", a: "Rates are updated daily and displayed in the app before you confirm any transaction." },
    { q: "Which gift cards do you accept?", a: "We support Apple, Amazon, Google Play, Steam, Netflix, Spotify, eBay, PlayStation, Xbox, Visa, Mastercard, and Vanilla." },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-100" />
        <div className="absolute inset-0 transition-colors duration-300" style={{ background: "var(--hero-gradient)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-3.5 py-1.5 mb-6 border border-gold/20">
              <CreditCard className="w-3.5 h-3.5 text-gold" />
              <span className="text-[11px] font-semibold text-gold tracking-wide">Ruxx Card</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight leading-tight">
              Buy. Sell.<br />
              <span className="gradient-text">Earn more.</span>
            </h1>
            <p className="mt-6 text-muted-foreground max-w-md mx-auto leading-relaxed">
              Trade gift cards at the best rates in Nigeria. Instant transactions, secure payments.
            </p>
            <div className="flex flex-wrap gap-3 mt-8 justify-center">
              <a href="https://play.google.com/store/apps/details?id=com.ruxx.pay" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all">
                <Smartphone className="w-4 h-4" /> Get Ruxx Card
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BRANDS GRID */}
      <section className="py-12 md:py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
              Supported <span className="gradient-text">brands</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {brands.map((brand, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}
                className="rounded-xl p-4 text-center border transition-colors hover:border-gold/30"
                style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                <CreditCard className="w-5 h-5 text-muted-foreground/50 mx-auto mb-2" />
                <span className="text-[12px] text-muted-foreground font-medium">{brand}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 md:py-28" style={{ background: "var(--section-alt)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
              Three steps. <span className="gradient-text">Done.</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-8 relative">
            <div className="absolute top-8 left-[20%] right-[20%] h-px hidden md:block" style={{ background: "var(--border)" }} />
            {[
              { num: "01", title: "Choose your card", desc: "Select the brand and amount." },
              { num: "02", title: "Confirm details", desc: "Review the rate before confirming." },
              { num: "03", title: "Get paid", desc: "Receive payment instantly." },
            ].map((step, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="text-center relative">
                <div className="text-4xl md:text-5xl font-black text-gold/20 mb-4">{step.num}</div>
                <h3 className="font-bold text-foreground text-lg mb-2">{step.title}</h3>
                <p className="text-[13px] text-muted-foreground max-w-xs mx-auto">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-12 md:py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">
                Why users choose <span className="gradient-text">Ruxx Card.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Best rates with instant payouts and a seamless trading experience.
              </p>
              <div className="space-y-3">
                {["Best rates updated daily", "Instant payment within minutes", "Secure encrypted transactions"].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-gold shrink-0" /> {text}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="grid grid-cols-3 gap-3">
              {[
                { val: "12+", label: "Brands" },
                { val: "< 5m", label: "Payout" },
                { val: "#1", label: "Rates" },
              ].map((stat, i) => (
                <div key={i} className="rounded-2xl p-5 text-center border" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                  <div className="text-2xl font-black text-gold">{stat.val}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28" style={{ background: "var(--section-alt)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">FAQ</h2>
            <p className="mt-2 text-muted-foreground text-sm">
              <Link to="/contact" className="text-primary hover:underline">Need help?</Link>
            </p>
          </motion.div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}>
                <div className="rounded-xl border overflow-hidden" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                   <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left" aria-expanded={faqOpen === i} aria-controls={`ruxxcard-faq-${i}`}>
                    <span className="text-sm font-semibold text-foreground pr-4">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${faqOpen === i ? "rotate-180" : ""}`} />
                  </button>
                  {faqOpen === i && (
                    <div id={`ruxxcard-faq-${i}`} role="region" className="px-6 pb-4 text-[13px] text-muted-foreground leading-relaxed border-t pt-3" style={{ borderColor: "var(--border)" }}>
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
      <section className="py-12 md:py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
              Start trading <span className="gradient-text">gift cards today.</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <a href="https://play.google.com/store/apps/details?id=com.ruxx.pay" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 md:px-8 py-3 md:py-3.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all">
                <Smartphone className="w-4 h-4" /> Download for Android
              </a>
              <a href="https://apps.apple.com/app/id6738738145" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border px-5 md:px-8 py-3 md:py-3.5 rounded-xl text-sm font-medium transition-all hover:bg-muted"
                style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
                <Smartphone className="w-4 h-4" /> Download for iOS
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
