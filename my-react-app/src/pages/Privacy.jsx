import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.03 } }),
};
const stagger = { visible: { transition: { staggerChildren: 0.03 } } };

export default function Privacy() {
  const sections = [
    {
      title: "1. Introduction",
      content: 'Ruxx Digital Services ("we," "us," or "our") operates the Ruxx Pay mobile application and the website at ruxxdigital.name.ng. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application, website, and related services (collectively, the "Services"). By using our Services, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this Privacy Policy, please do not access the Services.'
    },
    {
      title: "2. Information We Collect",
      content: "We collect several types of information to provide and improve our Services: (a) Personal Identification Information — When you register for an account, we collect your full name, email address, phone number, and date of birth. This information is necessary to create and manage your Ruxx Pay account and your Paystack Permanent Virtual Account (PVA). (b) Transaction Data — We record details of all transactions you perform through the app, including airtime and data top-ups, TV subscription payments, electricity token purchases, betting wallet funding, and gift card trades. This includes transaction amounts, dates, service providers, and reference numbers. (c) Payment Data — When you fund your wallet or make payments, your card details and bank account information are processed securely by Paystack. We do not store your full card number, CVV, or PIN on our servers. Paystack tokenizes your payment credentials so that subsequent transactions can be processed without re-entering sensitive data. (d) Technical and Device Data — We automatically collect information about your device, including your device model, operating system version, unique device identifiers, IP address, browser type, and mobile network information. This data helps us ensure the app functions correctly on your device and helps us detect fraudulent activity. (e) Usage Data — We collect information about how you interact with our Services, including the features you use, the screens you visit, the time and duration of your activities, and any error or crash reports. This data helps us understand user behavior and improve the app experience."
    },
    {
      title: "3. How We Use Your Information",
      content: "We use the information we collect for the following purposes: (a) To create, maintain, and secure your account and virtual payment account. (b) To process your transactions, including airtime purchases, bill payments, gift card trades, and wallet funding. (c) To verify your identity and prevent unauthorized access to your account. (d) To detect, prevent, and address fraud, technical issues, and other potentially harmful or illegal activity. (e) To communicate with you about your transactions, account security updates, promotional offers, and changes to our Services. You may opt out of promotional communications at any time. (f) To comply with legal obligations, including anti-money laundering (AML) regulations, know-your-customer (KYC) requirements, and tax reporting obligations under Nigerian law. (g) To analyze usage patterns and improve the functionality, user experience, and performance of our Services. (h) To provide customer support and respond to your inquiries, feedback, or dispute resolution requests."
    },
    {
      title: "4. Information Sharing & Disclosure",
      content: "We do not sell your personal information. We may share your data in the following circumstances: (a) With Payment Processors — Your payment data is shared with Paystack (a subsidiary of Stripe) to process transactions. Paystack operates under PCI-DSS Level 1 compliance and handles your card data according to their own privacy policy. (b) With Service Providers — We share transaction details with mobile network operators (MTN, Airtel, Glo, 9Mobile), TV subscription providers (DStv, GOtv, StarTimes), electricity distribution companies (IKEDC, EKEDC, KEDCO), and gift card issuers as necessary to fulfill your requests. (c) With Betting Partners — When you fund a betting wallet, your transaction is relayed to the relevant bookmaker (e.g., Bet9ja, Sportybet) to complete the funding. (d) For Legal Compliance — We may disclose your information to regulators, law enforcement agencies, or courts when required by law, court order, or governmental regulation. This includes compliance with anti-money laundering (AML) and counter-terrorism financing (CTF) obligations. (e) Business Transfers — In the event of a merger, acquisition, or sale of assets, your data may be transferred as part of the business transaction. We will notify you of any such change in advance. (f) With Your Consent — We may share your data for purposes not described in this policy only with your explicit consent."
    },
    {
      title: "5. Cookies & Tracking Technologies",
      content: "Our website at ruxxdigital.name.ng uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user behavior. Cookies are small text files stored on your device when you visit our website. We use the following types of cookies: (a) Essential Cookies — These are necessary for the website to function properly, including session management and security features. They cannot be disabled. (b) Analytics Cookies — These help us understand how visitors interact with our website by collecting anonymous usage data. We use services such as Google Analytics to measure site performance and identify areas for improvement. (c) Preference Cookies — These remember your settings and preferences, such as your theme choice (dark or light mode), to provide a personalized experience. (d) Marketing Cookies — These may be used to deliver relevant advertisements and track the effectiveness of our marketing campaigns. You can manage your cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of our website. Our mobile application does not use browser cookies but may use local storage and device identifiers for similar purposes."
    },
    {
      title: "6. Data Security",
      content: "We take the security of your data seriously and implement multiple layers of protection: (a) Encryption — All data transmitted between your device and our servers is encrypted using 256-bit SSL/TLS encryption. Your payment credentials are encrypted end-to-end through Paystack's PCI-compliant infrastructure. (b) Secure Infrastructure — Our services are hosted on secure cloud infrastructure with firewalls, intrusion detection systems, and regular security audits. We use Upstash Redis for data storage with access controls and encryption at rest. (c) Access Controls — Access to personal data is restricted to authorized personnel on a need-to-know basis. All access is logged and monitored. (d) Payment Security — We never store your full card number, CVV, or PIN. Paystack tokenizes your payment data so that sensitive credentials never touch our servers. (e) Account Security — We encourage you to use a strong, unique password for your account and enable any available two-factor authentication features. You are responsible for maintaining the confidentiality of your account credentials. (f) Incident Response — In the event of a data breach that affects your personal information, we will notify you and the relevant Nigerian data protection authorities within 72 hours as required by the Nigeria Data Protection Regulation (NDPR)."
    },
    {
      title: "7. Data Retention",
      content: "We retain your personal and transaction data for as long as necessary to fulfill the purposes described in this policy: (a) Account Data — We retain your registration information (name, email, phone) for as long as your account is active. If you delete your account, we will remove your personal data within 30 days, except where retention is required by law. (b) Transaction Records — We retain transaction records for a minimum of 5 years as required by Nigerian financial regulations and anti-money laundering (AML) laws. (c) Technical Data — Device and usage data is retained for up to 2 years for analytics and security purposes. (d) Marketing Data — If you opt out of marketing communications, we retain only your opt-out preference and contact details sufficient to honor your request. (e) Legal Holds — Where we are subject to legal proceedings or regulatory investigation, we may retain relevant data until the matter is resolved, regardless of the retention periods stated above."
    },
    {
      title: "8. Your Rights",
      content: "Under the Nigeria Data Protection Regulation (NDPR) and other applicable laws, you have the following rights regarding your personal data: (a) Right of Access — You may request a copy of all personal data we hold about you. We will respond to your request within 30 days. (b) Right to Rectification — You may request correction of inaccurate or incomplete personal data. You can update most information directly through the app's profile settings. (c) Right to Erasure — You may request deletion of your personal data, subject to our legal retention obligations. Certain transaction records must be retained for regulatory compliance. (d) Right to Data Portability — You may request your data in a structured, commonly used, machine-readable format. (e) Right to Object — You may object to the processing of your data for specific purposes, including direct marketing. (f) Right to Withdraw Consent — Where processing is based on your consent, you may withdraw that consent at any time without affecting the lawfulness of prior processing. (g) Right to Lodge a Complaint — If you believe your data protection rights have been violated, you may lodge a complaint with the Nigeria Data Protection Commission (NDPC). To exercise any of these rights, contact us at info@ruxxdigital.name.ng."
    },
    {
      title: "9. Children's Privacy",
      content: "Ruxx Pay is not directed to individuals under the age of 18. We do not knowingly collect personal data from children or minors. If we become aware that we have collected personal data from a child under 18 without verification of parental consent, we will take steps to delete that information promptly. If you are a parent or guardian and believe your child has provided us with personal data, please contact us at info@ruxxdigital.name.ng so we can take appropriate action."
    },
    {
      title: "10. Third-Party Services",
      content: "Our Services integrate with third-party providers whose own privacy policies govern their data practices: (a) Paystack — Payment processing, wallet funding, and virtual account management. Paystack's privacy policy is available at https://paystack.com/privacy. (b) Google Analytics — Website traffic analysis and performance monitoring. Google's privacy policy is available at https://policies.google.com/privacy. (c) Google AdSense — Advertising services on our website. Google's ad personalization settings are available at https://adssettings.google.com. (d) Mobile Network Operators — Airtime and data delivery through MTN, Airtel, Glo, and 9Mobile. (e) TV Providers — Subscription processing through DStv, GOtv, and StarTimes. We encourage you to review the privacy policies of these third-party services. We are not responsible for the practices of third-party providers."
    },
    {
      title: "11. Changes to This Policy",
      content: "We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. When we make material changes, we will notify you through the app, via email, or by posting a prominent notice on our website at least 14 days before the changes take effect. Your continued use of the Services after the effective date of any updated Privacy Policy constitutes your acceptance of the changes. We encourage you to review this policy periodically to stay informed about how we protect your data."
    },
    {
      title: "12. Governing Law & Contact",
      content: "This Privacy Policy is governed by and construed in accordance with the laws of the Federal Republic of Nigeria, including the Nigeria Data Protection Regulation (NDPR) and the Nigeria Data Protection Act 2023. If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at: Email: info@ruxxdigital.name.ng | Phone: +234 903 730 6845 | Address: Lagos, Nigeria. We aim to respond to all privacy-related inquiries within 48 hours."
    },
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
