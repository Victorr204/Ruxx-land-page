import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, CreditCard, Zap, CheckCircle2, ArrowLeft } from "lucide-react";
import paystackLogo from "@/assets/images/paystack.png";
import paystackSvg from "@/assets/images/paystack-logo.svg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function Paystack() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>

      {/* HERO */}
      <section className="relative overflow-hidden pt-24 pb-6 md:pt-32 md:pb-8">
        <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--hero-gradient)" }} />

        <div style={{ maxWidth: "64rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "1rem", paddingRight: "1rem", position: "relative", zIndex: 10 }}>
          <motion.div variants={fadeUp}>
            <Link to="/" className="inline-flex items-center gap-2 text-[13px] font-medium mb-6" style={{ color: "var(--muted-foreground)" }}>
              <ArrowLeft style={{ width: "16px", height: "16px" }} /> Back to Home
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <img src={paystackSvg} alt="Paystack" style={{ width: "48px", height: "48px" }} />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground" style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                Powered by <span style={{ color: "#00C853" }}>Paystack</span>
              </h1>
            </div>

            <p className="text-muted-foreground" style={{ maxWidth: "36rem", lineHeight: 1.65, fontSize: "1rem" }}>
              Every transaction on Ruxx Digital Services is processed through Paystack's
              PCI-compliant infrastructure — the same payment platform trusted by thousands
              of businesses across Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PAYSTACK BANNER */}
      <section style={{ paddingBottom: "4rem" }}>
        <div style={{ maxWidth: "40rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "1rem", paddingRight: "1rem" }}>
          <motion.div variants={fadeUp}>
            <img src={paystackLogo} alt="Now accepting payments via Paystack" style={{ width: "100%", borderRadius: "1rem", border: "1px solid var(--card-border)" }} />
          </motion.div>
        </div>
      </section>

      {/* WHY PAYSTACK */}
      <section style={{ padding: "3rem 0" }}>
        <div style={{ maxWidth: "64rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "1rem", paddingRight: "1rem" }}>
          <motion.div variants={fadeUp} className="text-center mb-8 md:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full" style={{ padding: "0.25rem 0.75rem", marginBottom: "1rem", background: "rgba(0,200,83,0.08)", border: "1px solid rgba(0,200,83,0.15)" }}>
              <span className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: "#00C853" }}>Why Paystack</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground" style={{ letterSpacing: "-0.025em" }}>
              Africa's most trusted <span className="gradient-text">payment infrastructure.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <ShieldCheck className="w-5 h-5" />, title: "PCI-DSS Level 1", desc: "The highest level of payment card industry compliance. Your card details are never stored on our servers.", color: "rgba(0,200,83,0.1)", iconColor: "#00C853" },
              { icon: <Lock className="w-5 h-5" />, title: "256-bit Encryption", desc: "Bank-grade SSL encryption on every data transfer. Same security used by major financial institutions.", color: "rgba(59,130,246,0.1)", iconColor: "#3b82f6" },
              { icon: <Zap className="w-5 h-5" />, title: "Instant Processing", desc: "Transactions complete in under 10 seconds. Real-time verification and confirmation.", color: "rgba(245,158,11,0.1)", iconColor: "#f59e0b" },
              { icon: <CreditCard className="w-5 h-5" />, title: "Multi-Bank Support", desc: "Visa, Mastercard, Verve, and bank transfers. All major payment methods accepted.", color: "rgba(168,85,247,0.1)", iconColor: "#a855f7" },
              { icon: <CheckCircle2 className="w-5 h-5" />, title: "Fraud Detection", desc: "AI-powered fraud monitoring detects and prevents suspicious transactions in real-time.", color: "rgba(236,72,153,0.1)", iconColor: "#ec4899" },
              { icon: <Zap className="w-5 h-5" />, title: "99.99% Uptime", desc: "Enterprise-grade infrastructure with redundant systems. Your payments never go down.", color: "rgba(34,197,94,0.1)", iconColor: "#22c55e" },
            ].map((f, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}
                className="rounded-2xl p-6 border transition-all"
                style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = "rgba(0,200,83,0.2)"; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "var(--card-border)"; }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: f.color, color: f.iconColor }}>{f.icon}</div>
                <h3 className="font-bold text-foreground text-sm mb-1.5">{f.title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "3rem 0", background: "var(--section-alt)" }}>
        <div style={{ maxWidth: "64rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "1rem", paddingRight: "1rem" }}>
          <motion.div variants={fadeUp} className="text-center mb-8 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-foreground" style={{ letterSpacing: "-0.025em" }}>
              How payment <span className="gradient-text">processing works.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "You initiate", desc: "Choose a service and enter payment details in the Ruxx app." },
              { num: "02", title: "Encryption", desc: "Your card data is encrypted with 256-bit SSL before leaving your device." },
              { num: "03", title: "Verification", desc: "Paystack verifies the transaction with your bank in real-time." },
              { num: "04", title: "Confirmation", desc: "Payment is processed and your service is delivered instantly." },
            ].map((step, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(0,200,83,0.1)" }}>
                  <span className="font-black" style={{ color: "#00C853" }}>{step.num}</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-[13px]" style={{ lineHeight: 1.6, color: "var(--muted-foreground)" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section style={{ padding: "3rem 0" }}>
        <div style={{ maxWidth: "64rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "1rem", paddingRight: "1rem" }}>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl md:text-4xl font-black text-foreground" style={{ letterSpacing: "-0.025em", marginBottom: "1rem" }}>
                Your security is<br /><span style={{ color: "#00C853" }}>non-negotiable.</span>
              </h2>
              <p className="text-muted-foreground mb-6" style={{ lineHeight: 1.6 }}>
                Paystack is certified to PCI-DSS Level 1 — the most stringent level of certification
                in the payments industry. This means your card information is handled with the highest
                security standards available.
              </p>
              <div className="space-y-3">
                {[
                  "Card details never touch our servers",
                  "End-to-end encryption on every transaction",
                  "Real-time fraud detection and prevention",
                  "Instant refund on failed transactions",
                  "Regulated by CBN (Central Bank of Nigeria)",
                  "Trusted by 100,000+ businesses across Africa",
                ].map((text, i) => (
                  <div key={i} className="flex items-center text-sm" style={{ gap: "0.75rem", color: "var(--muted-foreground)" }}>
                    <CheckCircle2 style={{ width: "16px", height: "16px", color: "#00C853", flexShrink: 0 }} /> {text}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={1}
              className="rounded-3xl p-5 md:p-8 border"
              style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
            >
              <img src={paystackSvg} alt="Paystack" style={{ width: "60px", height: "60px", marginBottom: "1.5rem" }} />
              <h3 className="text-xl font-bold text-foreground mb-3">Paystack Buyer Protection</h3>
              <p className="text-[13px] text-muted-foreground mb-4" style={{ lineHeight: 1.6 }}>
                Every transaction is covered by Paystack's buyer protection policy.
                If a payment fails or a service isn't delivered, you're fully covered.
              </p>
              <div className="flex flex-wrap gap-2">
                {["PCI-DSS", "SSL", "3D Secure", "Tokenization", "Fraud Shield"].map((tag) => (
                  <span key={tag} className="text-[10px] font-semibold rounded-full px-2.5 py-1" style={{ background: "rgba(0,200,83,0.08)", color: "#00C853" }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "3rem 0", background: "var(--section-alt)" }}>
        <div style={{ maxWidth: "48rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "1rem", paddingRight: "1rem", textAlign: "center" }}>
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              Ready to pay<br /><span className="gradient-text">securely?</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto">
              Experience bank-grade security on every transaction with Ruxx Digital Services powered by Paystack.
            </p>
            <div className="flex flex-wrap justify-center" style={{ gap: "0.75rem", marginTop: "2rem" }}>
              <Link to="/ruxxpay"
                className="inline-flex items-center gap-2 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                style={{ padding: "0.875rem 2rem", background: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                Start with RuxxPay
              </Link>
              <Link to="/contact"
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
