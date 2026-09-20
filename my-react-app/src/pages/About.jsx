import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, Eye, Heart, ShieldCheck, Zap, Award, Users, TrendingUp } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const STATS_API = import.meta.env.VITE_STATS_API_URL;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 } }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function About() {
  const [stats, setStats] = useState({ users: 0 });

  useEffect(() => {
    if (!STATS_API) return;
    fetch(STATS_API)
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
              Building the<br />
              <span className="gradient-text">future of payments.</span>
            </h1>
            <p className="mt-6 text-muted-foreground max-w-lg mx-auto leading-relaxed">
              A subsidiary of Kognatix Ltd, on a mission to make digital payments accessible, fast, and secure for everyone.
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
                  Ruxx Digital Services was born from a simple observation: digital payments
                  in Nigeria should be easier, faster, and more accessible. Founded under
                  the umbrella of Kognatix Ltd, we set out to build a platform that would
                  eliminate the friction in everyday transactions.
                </p>
                <p>
                  What started as a vision to simplify airtime purchases has grown into a
                  comprehensive digital payment ecosystem — covering airtime, data, TV
                  subscriptions, electricity bills, betting facilitation, and gift card trading.
                </p>
                <p>
                  Today, Ruxx Digital Services powers thousands of transactions daily,
                  serving users who demand speed, reliability, and transparency.
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

      {/* PARENT COMPANY */}
      <section className="py-12 md:py-20 lg:py-28" style={{ background: "var(--section-alt)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-3.5 py-1.5 mb-6 border border-primary/20">
              <Users className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] font-semibold text-primary tracking-wide">Parent Company</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-5">
              <span className="gradient-text">Kognatix</span> Ltd
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Kognatix Ltd is the parent company behind Ruxx Digital Services. With a
              vision to drive digital transformation across Africa, Kognatix invests in
              innovative technology solutions that empower individuals and businesses.
            </p>
          </motion.div>
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
                To provide fast, reliable, and affordable digital payment solutions that
                empower every Nigerian to manage their everyday transactions with ease
                and confidence.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="rounded-3xl p-5 md:p-8 border" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
              <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-5">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Our Vision</h3>
              <p className="text-[14px] text-muted-foreground leading-relaxed">
                To become Africa's leading digital payment platform, bridging the gap
                between traditional financial services and the digital economy through
                innovation and user-centric design.
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
              { icon: <ShieldCheck className="w-5 h-5" />, title: "Trust", desc: "Bank-grade security on every transaction.", color: "text-purple-500" },
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
    </motion.div>
  );
}
