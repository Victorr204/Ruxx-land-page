import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Instagram, Clock, MessageSquare, HelpCircle, Shield } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 } }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:info@ruxxdigital.name.ng?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, title: "Email", detail: "info@ruxxdigital.name.ng", link: "mailto:info@ruxxdigital.name.ng", color: "text-blue-500" },
    { icon: <Phone className="w-5 h-5" />, title: "Phone", detail: "+234 903 730 6845", link: "tel:+2349037306845", color: "text-emerald-500" },
    { icon: <MapPin className="w-5 h-5" />, title: "Office", detail: "Lagos, Nigeria", link: null, color: "text-purple-500" },
    { icon: <Clock className="w-5 h-5" />, title: "Hours", detail: "24/7 Support", link: null, color: "text-amber-500" },
  ];

  const socials = [
    { icon: <Instagram className="w-4 h-4" />, href: "https://www.instagram.com/ruxx_digital_services?igsh=MTU1a3Rhd2V4b3phag==", label: "Instagram" },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-100" />
        <div className="absolute inset-0 transition-colors duration-300" style={{ background: "var(--hero-gradient)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div variants={fadeUp}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight leading-tight">
              Let's<br /><span className="gradient-text">talk.</span>
            </h1>
            <p className="mt-6 text-muted-foreground max-w-md mx-auto">Questions, feedback, or support — we're here 24/7.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-10">
            <div className="lg:col-span-2 space-y-3">
              {contactInfo.map((info, i) => (
                <motion.div key={i} variants={fadeUp} custom={i}
                  className="rounded-xl px-5 py-4 border flex items-center gap-4 transition-colors hover:border-primary/20"
                  style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                  <div className={`w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center ${info.color} shrink-0`}>{info.icon}</div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-muted-foreground uppercase tracking-wide">{info.title}</div>
                    {info.link ? (
                      <a href={info.link} className="text-sm text-foreground font-medium hover:text-primary transition-colors block truncate">{info.detail}</a>
                    ) : (
                      <div className="text-sm text-foreground font-medium">{info.detail}</div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div className="flex gap-2 pt-2">
                {socials.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="w-9 h-9 rounded-lg border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                    style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3">
              <motion.div variants={fadeUp} custom={1} className="rounded-3xl p-5 md:p-8 border" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                {submitted ? (
                  <div className="text-center py-16">
                    <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                      <Send className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Message Ready.</h3>
                    <p className="text-sm text-muted-foreground">Your email client will open to send the message.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] font-medium text-muted-foreground mb-1.5">Name</label>
                        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          style={{ background: "var(--section-alt)", borderColor: "var(--card-border)" }} placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-[12px] font-medium text-muted-foreground mb-1.5">Email</label>
                        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          style={{ background: "var(--section-alt)", borderColor: "var(--card-border)" }} placeholder="john@example.com" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] font-medium text-muted-foreground mb-1.5">Subject</label>
                      <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        style={{ background: "var(--section-alt)", borderColor: "var(--card-border)" }} placeholder="How can we help?" />
                    </div>
                    <div>
                      <label className="block text-[12px] font-medium text-muted-foreground mb-1.5">Message</label>
                      <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                        style={{ background: "var(--section-alt)", borderColor: "var(--card-border)" }} placeholder="Tell us more..." />
                    </div>
                    <button type="submit" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all">
                      <Send className="w-4 h-4" /> Send Message
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-28" style={{ background: "var(--section-alt)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground" style={{ letterSpacing: "-0.025em" }}>
              How we handle <span className="gradient-text">your inquiries.</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <MessageSquare className="w-5 h-5" />, title: "Quick Response", desc: "Our support team responds to all inquiries within 24 hours. For urgent issues, reach us via phone for immediate assistance.", color: "rgba(124,58,237,0.1)", iconColor: "var(--primary)" },
              { icon: <HelpCircle className="w-5 h-5" />, title: "Before You Contact", desc: "Check our FAQ section for instant answers to common questions about wallet funding, transactions, refunds, and account setup.", color: "rgba(245,158,11,0.1)", iconColor: "var(--gold)" },
              { icon: <Shield className="w-5 h-5" />, title: "Report an Issue", desc: "If you experience a failed transaction or suspicious activity, contact us immediately. We resolve security concerns within 2 hours.", color: "rgba(34,197,94,0.1)", iconColor: "#22c55e" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="rounded-2xl p-6 border"
                style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: item.color, color: item.iconColor }}>{item.icon}</div>
                <h3 className="font-bold text-foreground text-sm mb-1.5">{item.title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-foreground" style={{ letterSpacing: "-0.025em" }}>
              Common <span className="gradient-text">topics.</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Wallet & Funding", desc: "Issues with Paystack virtual account, deposit failures, balance discrepancies." },
              { title: "Transactions", desc: "Failed airtime, data, TV payments. Wrong number recharges. Betting wallet issues." },
              { title: "Gift Cards", desc: "Card trading rates, pending trades, card rejection, payment delays." },
              { title: "Account & Security", desc: "Password reset, account verification, suspicious activity, data requests." },
            ].map((topic, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="rounded-xl p-5 border"
                style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                <h3 className="font-bold text-foreground text-sm mb-1">{topic.title}</h3>
                <p className="text-[12px]" style={{ color: "var(--muted-foreground)" }}>{topic.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
