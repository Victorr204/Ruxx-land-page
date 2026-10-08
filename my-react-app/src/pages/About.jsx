import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, Eye, Heart, ShieldCheck, Zap, Award, User } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import RegulatoryNotice from "@/components/RegulatoryNotice";

const STATS_API = import.meta.env.VITE_STATS_API_URL;
const API_BASE = STATS_API ? STATS_API.replace("/api/stats", "") : "";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 } }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function About() {
  const [stats, setStats] = useState({ users: 0 });

  useEffect(() => {
    if (!API_BASE) return;
    fetch(`${API_BASE}/api/track-visit`, { method: "POST" })
      .then((r) => r.json())
      .then((data) => setStats({ users: data.users || 0 }))
      .catch(() => {});
  }, []);
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-100" />
        <div className="absolute inset-0 transition-colors duration-300" style={{ background: "var(--hero-gradient)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div variants={fadeUp}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight leading-tight">
              Making every bill<br />
              <span className="gradient-text">easier to pay.</span>
            </h1>
            <p className="mt-6 text-muted-foreground max-w-lg mx-auto leading-relaxed">
              On a mission to make airtime, data, electricity and
              cable TV top-ups accessible, fast, and secure for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STORY + STATS */}
      <section className="py-12 md:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-5 md:p-8 lg:gap-12 items-start max-w-6xl mx-auto">
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl font-black text-foreground tracking-tight mb-5">Our story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Ruxx Digital Services was born from a simple observation: paying everyday
                  bills in Nigeria should be easier, faster, and more accessible. Founded in
                  Nigeria, we set out to build a platform that would
                  eliminate the friction in everyday utility purchases.
                </p>
                <p>
                  What started as a vision to simplify airtime purchases has grown into a
                  complete utility aggregation platform — covering airtime, data, TV
                  subscriptions, electricity bills, betting facilitation, and movie streaming.
                </p>
                <p>
                  Today, Ruxx Digital Services powers thousands of top-ups daily,
                  serving users who demand speed, reliability, and transparency. We are a
                  value-added services reseller, not a bank — money in only ever buys
                  services inside the platform.
                </p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="grid grid-cols-2 gap-3">
              {[
                { end: stats.users, suffix: "+", label: "Users" },
                { end: 10, suffix: "K+", label: "Transactions" },
                { end: 99, suffix: ".9%", label: "Uptime" },
                { end: 24, suffix: "/7", label: "Support" },
              ].map((stat, i) => (
                <div key={i} className="rounded-2xl p-5 text-center border" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                  <div className="text-2xl font-black text-primary">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} duration={2000} />
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="py-12 md:py-20 lg:py-28" style={{ background: "var(--section-alt)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div variants={fadeUp} className="text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-3.5 py-1.5 mb-6 border border-primary/20">
                <User className="w-3.5 h-3.5 text-primary" />
                <span className="text-[11px] font-semibold text-primary tracking-wide">Founder</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">
                Victor Chidiebere <span className="gradient-text">Ruben</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Victor Chidiebere Ruben is the founder of Ruxx Digital Services. With a passion
                for consumer technology and a vision to simplify everyday bill payments across
                Nigeria, Victor established Ruxx to put airtime, data, power and entertainment
                in one mobile-first app.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Under his leadership, Ruxx has grown into a trusted platform serving thousands
                of users daily for airtime, data, TV subscriptions, electricity bills, and
                movie streaming.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-12 md:py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-5">
            <motion.div variants={fadeUp} className="rounded-3xl p-5 md:p-8 border" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-5">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Our Mission</h3>
              <p className="text-[14px] text-muted-foreground leading-relaxed">
                To provide fast, reliable, and affordable utility and bill payment services that
                empower every Nigerian to take care of their everyday top-ups with ease
                and confidence.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="rounded-3xl p-5 md:p-8 border" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
              <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-5">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Our Vision</h3>
              <p className="text-[14px] text-muted-foreground leading-relaxed">
                To become Africa's leading utility aggregation and value-added services
                platform, connecting everyday Nigerians to airtime, data, power and
                entertainment through simple, transparent, mobile-first design.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-12 md:py-20 lg:py-28" style={{ background: "var(--section-alt)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
              What we <span className="gradient-text">stand for</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <ShieldCheck className="w-5 h-5" />, title: "Trust", desc: "End-to-end encryption on every top-up.", color: "text-purple-500" },
              { icon: <Zap className="w-5 h-5" />, title: "Innovation", desc: "Evolving to deliver faster solutions.", color: "text-amber-500" },
              { icon: <Heart className="w-5 h-5" />, title: "User-First", desc: "Every feature starts with our users.", color: "text-pink-500" },
              { icon: <Award className="w-5 h-5" />, title: "Excellence", desc: "The highest standards in everything.", color: "text-emerald-500" },
            ].map((v, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}
                className="rounded-2xl p-6 border transition-colors hover:border-primary/20"
                style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                <div className={`w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center ${v.color} mb-4`}>{v.icon}</div>
                <h3 className="font-bold text-foreground text-sm mb-1.5">{v.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* REGULATORY NOTICE */}
      <section className="py-12 md:py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full" style={{ padding: "0.25rem 0.75rem", marginBottom: "1rem", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.12)" }}>
              <span className="text-[10px] font-semibold text-primary tracking-wider uppercase">Compliance</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
              What we are — <span className="gradient-text">and what we are not.</span>
            </h2>
          </motion.div>
          <motion.div variants={fadeUp}>
            <RegulatoryNotice variant="full" />
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
