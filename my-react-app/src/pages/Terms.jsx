import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.03 } }),
};
const stagger = { visible: { transition: { staggerChildren: 0.03 } } };

export default function Terms() {
  const sections = [
    { title: "1. Introduction", content: "These Terms of Service govern your use of Ruxx Pay, a mobile application provided by Ruxx Digital Services (a subsidiary of Kognatix Ltd). By downloading, installing, or using Ruxx Pay, you agree to comply with and be bound by these Terms." },
    { title: "2. Definitions", content: '"App" means Ruxx Pay. "Company" means Ruxx Digital Services. "User" means any individual or entity who registers for or uses the App. "Services" include airtime & data top-up, TV subscriptions, betting facilitation, gift cards, and Netflix subscriptions.' },
    { title: "3. Account Registration & Virtual Account", content: "To use Ruxx Pay, you must register and provide accurate personal information. Upon registration, we create a Paystack Permanent Virtual Account (PVA) unique to you. You authorize us to map deposits made to your PVA to your in-app wallet." },
    { title: "4. Services Offered", content: "Ruxx Pay enables you to: Top up airtime and mobile data; Subscribe to DStv, GOtv, StarTimes, and other TV packages; Fund bets with partnered bookmakers; Purchase and redeem gift cards; Subscribe to Netflix plans." },
    { title: "5. Fees and Pricing", content: "Standard transaction fees may apply depending on the service. A non-refundable 5% processing fee is charged on all gift card purchases. All other fees are displayed at checkout before you confirm payment." },
    { title: "6. Payment Authorization", content: "By initiating a transaction, you authorize Ruxx Digital Services and Paystack to process payments on your behalf. You confirm that you are the rightful owner of the payment method and that all provided information is accurate." },
    { title: "7. Gift Cards & Netflix Subscriptions", content: "Gift cards and Netflix subscription codes are delivered instantly within the app. Redemption and validity are subject to third-party issuer terms." },
    { title: "8. Betting Transactions", content: "Betting services are facilitated through licensed partners. You acknowledge the risks of wagering and agree to comply with all applicable laws. Users under 18 years old are strictly prohibited from using the betting feature." },
    { title: "9. Refunds & Cancellations", content: "All sales are final. Refunds or cancellations are granted only in case of technical failures on our end. To request a review, contact support within 24 hours of your transaction." },
    { title: "10. User Responsibilities", content: "You agree to: Provide accurate account information; Keep your login credentials secure; Use Services only for lawful purposes; Not impersonate others or tamper with the App." },
    { title: "11. Intellectual Property", content: "All content and branding in Ruxx Pay are owned by Ruxx Digital Services or its licensors. You may not reproduce, distribute, or create derivative works without our express written consent." },
    { title: "12. Disclaimers & Limitation of Liability", content: 'The App is provided "as is." We disclaim all warranties, express or implied. To the fullest extent permitted by law, Ruxx Digital Services is not liable for any indirect, incidental, or consequential damages.' },
    { title: "13. Privacy & Data Protection", content: "Our Privacy Policy governs data collection, use, and sharing. By using the App, you consent to our collection and processing of your personal information as described in our Privacy Policy." },
    { title: "14. Changes to Terms", content: "We may update these Terms at any time. We will notify you of material changes via the App or email. Continued use after notice constitutes acceptance." },
    { title: "15. Governing Law & Contact", content: "These Terms are governed by the laws of Nigeria. For questions, email us at info@ruxxdigital.name.ng" },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-100" />
        <div className="absolute inset-0 transition-colors duration-300" style={{ background: "var(--hero-gradient)" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div variants={fadeUp}>
            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">Terms of Service</h1>
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
