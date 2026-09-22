import { useEffect } from "react";
import articles from "./articles";

const SITE_URL = "https://ruxxdigital.name.ng";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const pageSEO = {
  "/": {
    title: "Ruxx Digital Services — Smarter Payments. Zero Stress.",
    description: "Your all-in-one mobile payment app. Instantly purchase airtime, data, TV subscriptions, electricity bills, and trade gift cards. A subsidiary of Kognatix Ltd.",
    canonical: `${SITE_URL}/`,
  },
  "/ruxxpay": {
    title: "RuxxPay — Airtime, Data, TV, Electricity Payments | Ruxx Digital Services",
    description: "Pay bills instantly with RuxxPay. Buy airtime, data, TV subscriptions, pay electricity bills, and fund betting wallets — all from your phone.",
    canonical: `${SITE_URL}/ruxxpay`,
  },
  "/ruxx-card": {
    title: "Ruxx Card — Buy & Sell Gift Cards at Best Rates | Ruxx Digital Services",
    description: "Trade gift cards at the best rates in Nigeria. Buy and sell Amazon, iTunes, Google Play, and other gift cards instantly with secure payments.",
    canonical: `${SITE_URL}/ruxx-card`,
  },
  "/about": {
    title: "About Us — Victor Chidiebere Ruben, Founder | Ruxx Digital Services",
    description: "Learn about Ruxx Digital Services, founded by Victor Chidiebere Ruben. A subsidiary of Kognatix Ltd, on a mission to make digital payments smarter and easier for everyone.",
    canonical: `${SITE_URL}/about`,
  },
  "/contact": {
    title: "Contact Us — Ruxx Digital Services",
    description: "Get in touch with Ruxx Digital Services. Reach us via phone, email, or contact form. We respond to all inquiries within 24 hours.",
    canonical: `${SITE_URL}/contact`,
  },
  "/paystack": {
    title: "Payment Security — Powered by Paystack | Ruxx Digital Services",
    description: "Your payments are secured with Paystack's PCI-DSS compliant infrastructure. Bank-level encryption protects every transaction.",
    canonical: `${SITE_URL}/paystack`,
  },
  "/terms": {
    title: "Terms of Service — Ruxx Digital Services",
    description: "Read the terms and conditions governing the use of Ruxx Digital Services and our payment platforms.",
    canonical: `${SITE_URL}/terms`,
  },
  "/privacy": {
    title: "Privacy Policy — Ruxx Digital Services",
    description: "Learn how Ruxx Digital Services collects, uses, and protects your personal information. Your privacy is important to us.",
    canonical: `${SITE_URL}/privacy`,
  },
  "/blog": {
    title: "Blog — Insights & Guides on Digital Payments | Ruxx Digital Services",
    description: "Stay informed about digital payments, fintech trends, and practical guides for managing your finances in Nigeria.",
    canonical: `${SITE_URL}/blog`,
  },
};

function getBlogPostSEO(path) {
  const match = path.match(/^\/blog\/(.+)$/);
  if (!match) return null;
  const slug = match[1];
  const article = articles.find((a) => a.slug === slug);
  if (!article) return null;

  // Use per-article OG image if it exists, otherwise default
  const articleImage = `${SITE_URL}/og/blog/${article.slug}.png`;

  return {
    title: `${article.title} | Ruxx Digital Services`,
    description: article.excerpt,
    canonical: `${SITE_URL}/blog/${article.slug}`,
    image: articleImage,
  };
}

export default function SEO({ path }) {
  useEffect(() => {
    const page = getBlogPostSEO(path) || pageSEO[path] || pageSEO["/"];
    document.title = page.title;

    // Use per-article image or default
    const ogImage = page.image || DEFAULT_IMAGE;

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
    setMeta("og:image", ogImage, "property");
    setMeta("twitter:title", page.title);
    setMeta("twitter:description", page.description);
    setMeta("twitter:image", ogImage);

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
