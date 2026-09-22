import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.03 } }),
};
const stagger = { visible: { transition: { staggerChildren: 0.03 } } };

export default function Terms() {
  const sections = [
    {
      title: "1. Introduction",
      content: "These Terms of Service (\"Terms\") govern your use of the Ruxx Pay mobile application and the website at ruxxdigital.name.ng (collectively, the \"Services\"), provided by Ruxx Digital Services, a subsidiary of Kognatix Ltd (\"Company,\" \"we,\" \"us,\" or \"our\"). By downloading, installing, or using the Services, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, you must not use the Services. We reserve the right to modify these Terms at any time. Material changes will be communicated through the app or via email at least 14 days before taking effect. Your continued use of the Services after the effective date constitutes acceptance of the updated Terms."
    },
    {
      title: "2. Definitions",
      content: "\"App\" means the Ruxx Pay mobile application available on Google Play Store and Apple App Store. \"Company\" means Ruxx Digital Services, a subsidiary of Kognatix Ltd, registered in Nigeria. \"User,\" \"you,\" or \"your\" means any individual or entity who registers for or uses the Services. \"Services\" include airtime and mobile data top-ups, DStv/GOtv/StarTimes TV subscriptions, electricity meter token purchases, betting wallet funding, gift card trading, virtual account management, and any other features made available through the App. \"Wallet\" means your in-app balance funded through Paystack virtual account deposits. \"Virtual Account\" or \"PVA\" means the Paystack Permanent Virtual Account assigned to you upon registration for the purpose of receiving deposits."
    },
    {
      title: "3. Account Registration & Virtual Account",
      content: "To use Ruxx Pay, you must register and provide accurate, current, and complete personal information including your full name, email address, phone number, and date of birth. You must be at least 18 years old to create an account. Upon successful registration, we create a Paystack Permanent Virtual Account (PVA) unique to your account. This virtual account number is assigned to you personally and can be used to receive bank transfers 24/7. You authorize us to map deposits made to your PVA to your in-app wallet balance. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that provide false, inaccurate, or incomplete registration information."
    },
    {
      title: "4. Services Offered",
      content: "Ruxx Pay enables you to perform the following: (a) Airtime & Data Top-Up — Purchase airtime and mobile data bundles for all major Nigerian networks including MTN, Airtel, Glo, and 9Mobile. Delivery is instant and amounts are deducted from your wallet balance. (b) TV Subscriptions — Subscribe to DStv, GOtv, and StarTimes packages directly from the App. Subscription activations are processed within seconds. (c) Electricity — Purchase prepaid meter tokens for IKEDC, EKEDC, KEDCO, IBEDC, and all major electricity distribution companies in Nigeria. (d) Betting & Gaming — Fund betting wallets for partnered bookmakers including Bet9ja and Sportybet. You acknowledge that betting services are facilitated through licensed partners and you use them at your own risk. (e) Gift Cards — Purchase and redeem gift cards from Apple, Amazon, Google Play, Steam, Netflix, Spotify, eBay, PlayStation, Xbox, Visa, Mastercard, and Vanilla. Gift card rates are updated daily and displayed in the App before confirmation. (f) Virtual Account — Your personal Paystack PVA for 24/7 deposits. Funds reflect instantly upon transfer."
    },
    {
      title: "5. Fees and Pricing",
      content: "Standard transaction fees may apply depending on the service type: (a) Wallet Deposits — A flat 1.5% service fee is charged on every wallet deposit. For deposit amounts exceeding ₦10,000, an additional ₦50 Value Added Tax (VAT) applies. (b) Gift Card Purchases — A non-refundable 5% processing fee is charged on all gift card purchases. (c) Bill Payments — Airtime, data, TV, and electricity transactions may include service-specific fees which are displayed at checkout before you confirm payment. (d) Gift Card Trading — When selling gift cards, our buy-back rates are displayed in the App and updated daily. Rates may vary based on market conditions. (e) All fees are inclusive of applicable taxes unless otherwise stated. We reserve the right to modify fees at any time. Fee changes will be communicated through the App at least 7 days before taking effect. (f) No hidden charges — the total amount you pay is always displayed and confirmed by you before any transaction is processed."
    },
    {
      title: "6. Payment Authorization",
      content: "By initiating a transaction through the App, you authorize Ruxx Digital Services and Paystack to process payments on your behalf. You represent and warrant that: (a) You are the rightful owner of the payment method used for funding your wallet. (b) All information provided during payment is accurate and complete. (c) You have sufficient funds or credit available to complete the transaction. (d) You authorize us to charge your wallet balance for the full amount of each confirmed transaction. (e) You understand that wallet deposits are processed through Paystack's PCI-DSS Level 1 compliant infrastructure and are subject to Paystack's own terms of service. Transactions are generally processed instantly. In rare cases, processing may take up to 24 hours due to technical limitations of service providers. We are not liable for delays caused by third-party service providers."
    },
    {
      title: "7. Gift Cards & Subscriptions",
      content: "Gift cards and subscription codes (including Netflix, DStv, and other services) are delivered digitally within the App upon successful payment. Delivery is typically instant but may take up to 15 minutes during high-traffic periods. (a) Redemption — Gift card codes are your responsibility once delivered. We are not responsible for lost, stolen, or improperly redeemed codes. (b) Validity — Redemption and validity of gift cards are subject to the terms and conditions of the respective issuers (Apple, Amazon, Google, Steam, etc.). (c) Returns — All gift card sales are final. We do not accept returns or exchanges on delivered gift card codes. If you receive a defective or invalid code, contact support within 24 hours for investigation. (d) Rates — Gift card buy-back rates (when selling cards to us) are updated daily based on market conditions. Rates displayed in the App at the time of confirmation are binding."
    },
    {
      title: "8. Betting Transactions",
      content: "Betting and gaming wallet funding services are facilitated through our licensed bookmaker partners. By using the betting feature, you acknowledge and agree that: (a) You are at least 18 years of age and legally permitted to participate in betting activities under Nigerian law. (b) You understand the risks associated with wagering and accept full responsibility for your betting activities. (c) Ruxx Digital Services acts only as a facilitator for wallet funding and is not a party to any betting transaction. We do not guarantee the outcomes of any bets placed through partnered bookmakers. (d) You will comply with all applicable laws and regulations related to online betting in your jurisdiction. (e) We reserve the right to suspend or restrict your access to the betting feature if we suspect misuse, fraud, or violation of these Terms. (f) Losses incurred through betting are your sole responsibility. We do not provide refunds for betting-related losses."
    },
    {
      title: "9. Refunds & Cancellations",
      content: "Our refund policy is as follows: (a) General Rule — All transactions are final once confirmed by you. We do not provide refunds for completed transactions where the service was successfully delivered. (b) Failed Transactions — If a transaction fails due to a technical error on our end, the full amount will be refunded to your wallet balance automatically or within 24 hours. (c) Incorrect Details — If you provide incorrect details (e.g., wrong phone number for airtime, wrong meter number for electricity), we cannot guarantee recovery of funds. Contact support immediately for assistance. (d) Disputed Transactions — If you believe a transaction was unauthorized or incorrect, contact us within 24 hours of the transaction. We will investigate and respond within 48 hours. (e) Betting Refunds — Refunds for betting-related transactions are not provided unless the bookmaker partner initiates a reversal. (f) Wallet Balance — You may withdraw your wallet balance to your bank account at any time, subject to processing times and any applicable fees."
    },
    {
      title: "10. User Responsibilities",
      content: "By using the Services, you agree to: (a) Provide accurate, current, and complete information during registration and throughout your use of the Services. (b) Keep your login credentials secure and not share them with any third party. You are solely responsible for all activities under your account. (c) Use the Services only for lawful purposes and in compliance with all applicable Nigerian laws and regulations. (d) Not use the Services for money laundering, terrorism financing, fraud, or any other illegal activity. (e) Not attempt to gain unauthorized access to the App, its servers, or any connected databases or systems. (f) Not impersonate any person or entity, or misrepresent your affiliation with any person or entity. (g) Not use automated scripts, bots, or crawlers to interact with the Services. (h) Not interfere with or disrupt the Services, servers, or networks. (i) Promptly report any suspected security vulnerabilities or unauthorized use of your account to info@ruxxdigital.name.ng."
    },
    {
      title: "11. Intellectual Property",
      content: "All content, trademarks, logos, designs, graphics, text, software, and other intellectual property displayed in or comprising the Services are owned by Ruxx Digital Services, Kognatix Ltd, or our licensors and are protected by Nigerian and international intellectual property laws. You are granted a limited, non-exclusive, non-transferable, revocable license to use the App for personal, non-commercial purposes in accordance with these Terms. You may not: (a) Copy, modify, distribute, sell, or lease any part of our Services or included software. (b) Reverse engineer, decompile, or disassemble the App or any part thereof. (c) Remove, alter, or obscure any copyright, trademark, or other proprietary notices. (d) Use our trademarks, logos, or branding without prior written consent."
    },
    {
      title: "12. Disclaimers & Limitation of Liability",
      content: 'The Services are provided "as is" and "as available" without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Services will be uninterrupted, error-free, or completely secure. To the fullest extent permitted by Nigerian law: (a) Ruxx Digital Services and Kognatix Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Services. (b) Our total liability to you for any claim arising from these Terms or the Services shall not exceed the total fees you paid to us in the 12 months preceding the claim. (c) We are not liable for delays or failures caused by force majeure events including natural disasters, government actions, network outages, or third-party service failures. (d) We are not responsible for the actions, content, or services of third-party providers including Paystack, mobile networks, TV providers, or betting partners.'
    },
    {
      title: "13. Privacy & Data Protection",
      content: "Our collection, use, and protection of your personal data is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Services, you consent to the collection and processing of your personal information as described in our Privacy Policy. We comply with the Nigeria Data Protection Regulation (NDPR) and the Nigeria Data Protection Act 2023. For full details on how we handle your data, including your rights regarding access, correction, deletion, and portability of your data, please review our Privacy Policy."
    },
    {
      title: "14. Dispute Resolution",
      content: "In the event of any dispute, controversy, or claim arising out of or relating to these Terms or the Services: (a) Informal Resolution — You agree to first contact us at info@ruxxdigital.name.ng and attempt to resolve the dispute informally within 30 days. (b) Mediation — If informal resolution fails, either party may refer the dispute to mediation under the rules of the Lagos Multi-Door Courthouse (LMDC). (c) Arbitration — If mediation fails, the dispute shall be referred to and finally resolved by arbitration under the Arbitration and Mediation Act 2023 of Nigeria. The arbitration shall be conducted in Lagos, Nigeria, in the English language. (d) Governing Law — These Terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. (e) Jurisdiction — Subject to the arbitration clause, the courts of Lagos, Nigeria shall have exclusive jurisdiction over any proceedings arising from these Terms."
    },
    {
      title: "15. Changes to Terms",
      content: "We reserve the right to modify these Terms at any time. When we make material changes, we will notify you through the App, via email to the address associated with your account, or by posting a prominent notice on our website at least 14 days before the changes take effect. Your continued use of the Services after the effective date of any updated Terms constitutes your acceptance of the changes. If you do not agree to the updated Terms, you must stop using the Services and may delete your account."
    },
    {
      title: "16. Contact Information",
      content: "If you have any questions, concerns, or requests regarding these Terms of Service, please contact us at: Email: info@ruxxdigital.name.ng | Phone: +234 903 730 6845 | Address: Lagos, Nigeria | Website: ruxxdigital.name.ng. Our support team is available 24/7 to assist you."
    },
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
