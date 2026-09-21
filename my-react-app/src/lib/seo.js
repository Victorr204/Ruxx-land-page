import { useEffect } from "react";

const pageSEO = {
  "/": {
    title: "Ruxx Digital Services — Smarter Payments. Zero Stress.",
    description: "Your all-in-one mobile payment app. Instantly purchase airtime, data, TV subscriptions, electricity bills, and trade gift cards. A subsidiary of Kognatix Ltd.",
    canonical: "https://ruxxdigital.name.ng/",
  },
  "/ruxxpay": {
    title: "RuxxPay — Airtime, Data, TV, Electricity Payments | Ruxx Digital Services",
    description: "Pay bills instantly with RuxxPay. Buy airtime, data, TV subscriptions, pay electricity bills, and fund betting wallets — all from your phone.",
    canonical: "https://ruxxdigital.name.ng/ruxxpay",
  },
  "/ruxx-card": {
    title: "Ruxx Card — Buy & Sell Gift Cards at Best Rates | Ruxx Digital Services",
    description: "Trade gift cards at the best rates in Nigeria. Buy and sell Amazon, iTunes, Google Play, and other gift cards instantly with secure payments.",
    canonical: "https://ruxxdigital.name.ng/ruxx-card",
  },
  "/about": {
    title: "About Us — Ruxx Digital Services",
    description: "Learn about Ruxx Digital Services, a subsidiary of Kognatix Ltd, and our mission to make payments smarter and easier for everyone.",
    canonical: "https://ruxxdigital.name.ng/about",
  },
  "/contact": {
    title: "Contact Us — Ruxx Digital Services",
    description: "Get in touch with Ruxx Digital Services. Reach us via phone, email, or contact form. We respond to all inquiries within 24 hours.",
    canonical: "https://ruxxdigital.name.ng/contact",
  },
  "/paystack": {
    title: "Payment Security — Powered by Paystack | Ruxx Digital Services",
    description: "Your payments are secured with Paystack's PCI-DSS compliant infrastructure. Bank-level encryption protects every transaction.",
    canonical: "https://ruxxdigital.name.ng/paystack",
  },
  "/terms": {
    title: "Terms of Service — Ruxx Digital Services",
    description: "Read the terms and conditions governing the use of Ruxx Digital Services and our payment platforms.",
    canonical: "https://ruxxdigital.name.ng/terms",
  },
  "/privacy": {
    title: "Privacy Policy — Ruxx Digital Services",
    description: "Learn how Ruxx Digital Services collects, uses, and protects your personal information. Your privacy is important to us.",
    canonical: "https://ruxxdigital.name.ng/privacy",
  },
};

export default function SEO({ path }) {
  useEffect(() => {
    const page = pageSEO[path] || pageSEO["/"];
    document.title = page.title;

    const setMeta = (name, content, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (el) {
        el.setAttribute("content", content);
      } else {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        el.setAttribute("content", content);
        document.head.appendChild(el);
      }
    };

    setMeta("description", page.description);
    setMeta("og:title", page.title, "property");
    setMeta("og:description", page.description, "property");
    setMeta("og:url", page.canonical, "property");
    setMeta("twitter:title", page.title);
    setMeta("twitter:description", page.description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", page.canonical);
    } else {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      canonical.setAttribute("href", page.canonical);
      document.head.appendChild(canonical);
    }
  }, [path]);

  return null;
}
