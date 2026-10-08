import { motion } from "framer-motion";
import { Film, Smartphone, Play, Check, ChevronDown, Wifi, Globe, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AppDownloadButton } from "@/components/ComingSoon";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 } }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function RuxxStream() {
  const [faqOpen, setFaqOpen] = useState(null);
  const categories = ["Nollywood", "Hollywood", "Action", "Comedy", "Drama", "Romance", "Thriller", "Sci-Fi", "Documentaries", "Kids & Family", "Anime", "Classic Cinema"];

  const faqs = [
    { q: "What is Ruxx Stream?", a: "Ruxx Stream is the movie streaming service from Ruxx Digital Services — watch Nollywood blockbusters, Hollywood hits and more, straight from your phone or laptop." },
    { q: "Where do I watch?", a: "Open Ruxx Stream inside the Ruxx app or on the web. Your library follows your account, so you can pick up on any device where you left off." },
    { q: "Do I need a separate subscription?", a: "No. Stream with the same account you use for Ruxx Prepaid — one login, one balance, no extra sign-up." },
    { q: "Can I download movies to watch offline?", a: "Yes. Download titles while you are on Wi-Fi and watch them later without using data." },
    { q: "What quality can I stream in?", a: "Titles stream in HD and, where available, 4K. Playback adapts automatically to your connection so it never stalls." },
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
        <div className="absolute inset-0 dot-grid opacity-100" />
        <div className="absolute inset-0 transition-colors duration-300" style={{ background: "var(--hero-gradient)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-3.5 py-1.5 mb-6 border border-gold/20">
              <Film className="w-3.5 h-3.5 text-gold" />
              <span className="text-[11px] font-semibold text-gold tracking-wide">Ruxx Stream</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight leading-tight">
              Watch. Relax.<br />
              <span className="gradient-text">Repeat.</span>
            </h1>
            <p className="mt-6 text-muted-foreground max-w-md mx-auto leading-relaxed">
              Stream movies in Nigeria — Nollywood favourites, Hollywood blockbusters and more, in HD on any device.
            </p>
            <div className="flex flex-wrap gap-3 mt-8 justify-center">
              <AppDownloadButton store="android" className="px-7 py-3.5">
                <Play className="w-4 h-4" /> Start streaming
              </AppDownloadButton>
              <Link to="/contact"
                className="inline-flex items-center gap-2 border px-7 py-3.5 rounded-xl text-sm font-medium transition-all hover:bg-muted"
                style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
                <Smartphone className="w-4 h-4" /> Get the app
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="py-12 md:py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
              Something for <span className="gradient-text">every mood</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map((category, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}
                className="rounded-xl p-4 text-center border transition-colors hover:border-gold/30"
                style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                <Film className="w-5 h-5 text-muted-foreground/50 mx-auto mb-2" />
                <span className="text-[12px] text-muted-foreground font-medium">{category}</span>
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
              Three steps. <span className="gradient-text">Movie night.</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-8 relative">
            <div className="absolute top-8 left-[20%] right-[20%] h-px hidden md:block" style={{ background: "var(--border)" }} />
            {[
              { num: "01", title: "Open Ruxx Stream", desc: "Sign in with your Ruxx account." },
              { num: "02", title: "Pick a movie", desc: "Browse by genre, mood or release." },
              { num: "03", title: "Press play", desc: "Streaming starts instantly in HD." },
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
                Why viewers choose <span className="gradient-text">Ruxx Stream.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Crisp playback, a growing library and no juggling subscriptions — movies the way they should be.
              </p>
              <div className="space-y-3">
                {[
                  { icon: <Play className="w-4 h-4 text-gold shrink-0" />, text: "HD and 4K where available" },
                  { icon: <Download className="w-4 h-4 text-gold shrink-0" />, text: "Download for offline viewing" },
                  { icon: <Wifi className="w-4 h-4 text-gold shrink-0" />, text: "Adaptive streaming on any connection" },
                  { icon: <Globe className="w-4 h-4 text-gold shrink-0" />, text: "Your library follows your account" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    {item.icon} {item.text}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="grid grid-cols-3 gap-3">
              {[
                { val: "1,000+", label: "Titles" },
                { val: "HD", label: "Quality" },
                { val: "0", label: "Ads" },
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
                   <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left" aria-expanded={faqOpen === i} aria-controls={`ruxxstream-faq-${i}`}>
                    <span className="text-sm font-semibold text-foreground pr-4">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${faqOpen === i ? "rotate-180" : ""}`} />
                  </button>
                  {faqOpen === i && (
                    <div id={`ruxxstream-faq-${i}`} role="region" className="px-6 pb-4 text-[13px] text-muted-foreground leading-relaxed border-t pt-3" style={{ borderColor: "var(--border)" }}>
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
              Movie night <span className="gradient-text">starts now.</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <AppDownloadButton store="android" className="px-5 md:px-8 py-3 md:py-3.5">
                <Smartphone className="w-4 h-4" /> Download for Android
              </AppDownloadButton>
              <AppDownloadButton store="ios" variant="outline" className="px-5 md:px-8 py-3 md:py-3.5" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
                <Smartphone className="w-4 h-4" /> Download for iOS
              </AppDownloadButton>
            </div>
            <p className="mt-6 text-[13px] text-muted-foreground">
              <Check className="w-3.5 h-3.5 inline-block mr-1 text-gold" />
              One account for Ruxx Stream and Ruxx Prepaid.
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
