import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.03 } }),
};
const stagger = { visible: { transition: { staggerChildren: 0.03 } } };

export default function Privacy() {
  const sections = [
    { title: "1. Introduction", content: 'Ruxx Digital Services ("we," "us," or "our") operates the Ruxx Pay mobile app. We respect your privacy and are committed to protecting your personal data.' },
    { title: "2. Information We Collect", content: "Registration Data: name, email, phone number, date of birth. Transaction Data: airtime/data top-ups, subscription details, gift card purchases. Payment Data: bank account or card details via Paystack. Technical Data: device identifiers, IP address, OS version." },
    { title: "3. How We Use Your Information", content: "To create and manage your account and virtual account. To process transactions, refunds, and VAS requests. To improve our app's functionality. To communicate updates and security alerts. To comply with legal obligations." },
    { title: "4. Information Sharing & Disclosure", content: "We may share your data with: Paystack and other payment processors. Network and TV providers, betting partners, gift card issuers. Regulators, law enforcement, or courts when required by law." },
    { title: "5. Cookies & Tracking", content: "We do not use browser cookies. We collect technical and analytics data via secure SDKs to optimize performance." },
    { title: "6. Data Security", content: "We implement industry-standard measures (encryption, secure servers, access controls) to protect your data." },
    { title: "7. Data Retention", content: "We retain your personal and transaction data as long as necessary to provide services and comply with legal obligations." },
    { title: "8. Your Rights", content: "You may: Access or correct your personal information in-app. Request data deletion (subject to legal retention). Opt out of promotional communications." },
    { title: "9. Children's Privacy", content: "Ruxx Pay is not directed to children under 18. We do not knowingly collect data from minors." },
    { title: "10. Changes to This Policy", content: "We may update this Policy from time to time. Significant changes will be communicated in-app or via email." },
    { title: "11. Governing Law & Contact", content: "This Policy is governed by the laws of Nigeria. For questions, email us at info@ruxxdigital.name.ng" },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-100" />
        <div className="absolute inset-0 transition-colors duration-300" style={{ background: "var(--hero-gradient)" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div variants={fadeUp}>
            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">Privacy Policy</h1>
            <p className="mt-3 text-[13px] text-muted-foreground">
              Last updated: September 20, 2026
            </p>
          </motion.div>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {sections.map((section, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}
              className="rounded-xl px-6 py-5 border transition-colors hover:border-primary/20"
              style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
              <h2 className="text-[15px] font-bold text-foreground mb-2">{section.title}</h2>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
          <motion.div variants={fadeUp} className="pt-6 text-center">
            <p className="text-[13px] text-muted-foreground">
              Questions? <Link to="/contact" className="text-primary font-medium hover:underline">Contact us</Link>
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
