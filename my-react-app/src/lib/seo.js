import { useEffect } from "react";
import articles from "./articles";

const SITE_URL = "https://ruxxdigital.name.ng";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const pageSEO = {
  "/": {
    title: "Ruxx Digital Services — Airtime, Data, Electricity & Cable TV Top-Ups",
    description: "Ruxx Digital Services is a utility and bill payment app. Instantly buy airtime, data, electricity tokens and TV subscriptions, and stream movies with Ruxx Stream.",
    canonical: `${SITE_URL}/`,
  },
  "/ruxx-prepaid": {
    title: "Ruxx Prepaid — Airtime, Data, TV, Electricity Top-Ups | Ruxx Digital Services",
    description: "Automate airtime, data, TV and electricity top-ups with Ruxx Auto-Pay. Set your schedule and limits, confirm with your PIN, and never miss a payment again.",
    canonical: `${SITE_URL}/ruxx-prepaid`,
  },
  "/ruxx-stream": {
    title: "Ruxx Stream — Stream Movies in Nigeria | Ruxx Digital Services",
    description: "Stream Nollywood favourites, Hollywood blockbusters and more in HD with Ruxx Stream. Watch on any device and download for offline viewing.",
    canonical: `${SITE_URL}/ruxx-stream`,
  },
  // Legacy slugs — keep working, but point search engines at the new URLs
  "/ruxxpay": {
    title: "Ruxx Prepaid — Airtime, Data, TV, Electricity Top-Ups | Ruxx Digital Services",
    description: "Automate airtime, data, TV and electricity top-ups with Ruxx Auto-Pay. Set your schedule and limits, confirm with your PIN, and never miss a payment again.",
    canonical: `${SITE_URL}/ruxx-prepaid`,
  },
  "/ruxx-swap": {
    title: "Ruxx Stream — Stream Movies in Nigeria | Ruxx Digital Services",
    description: "Stream Nollywood favourites, Hollywood blockbusters and more in HD with Ruxx Stream.",
    canonical: `${SITE_URL}/ruxx-stream`,
  },
  "/ruxx-card": {
    title: "Ruxx Stream — Stream Movies in Nigeria | Ruxx Digital Services",
    description: "Stream Nollywood favourites, Hollywood blockbusters and more in HD with Ruxx Stream.",
    canonical: `${SITE_URL}/ruxx-stream`,
  },
  "/about": {
    title: "About Us — Victor Chidiebere Ruben, Founder | Ruxx Digital Services",
    description: "Learn about Ruxx Digital Services, a value-added services reseller and utility aggregation platform founded by Victor Chidiebere Ruben.",
    canonical: `${SITE_URL}/about`,
  },
  "/contact": {
    title: "Contact Us — Ruxx Digital Services",
    description: "Get in touch with Ruxx Digital Services. Reach us via phone, email, or contact form. We respond to all inquiries within 24 hours.",
    canonical: `${SITE_URL}/contact`,
  },
  "/paystack": {
    title: "Payment Security — Powered by Paystack | Ruxx Digital Services",
    description: "Every top-up on ruxx prepaid is processed by Paystack under its PCI-DSS Level 1 and CBN-licensed payment gateway infrastructure. End-to-end encryption protects every transaction.",
    canonical: `${SITE_URL}/paystack`,
  },
  "/terms": {
    title: "Terms of Service — Ruxx Digital Services",
    description: "Read the terms governing ruxx prepaid — a utility aggregation interface. Prepaid balances are non-withdrawable, non-transferable utility credit.",
    canonical: `${SITE_URL}/terms`,
  },
  "/privacy": {
    title: "Privacy Policy — Ruxx Digital Services",
    description: "Learn how Ruxx Digital Services collects, uses, and protects your personal information. Your privacy is important to us.",
    canonical: `${SITE_URL}/privacy`,
  },
  "/blog": {
    title: "Blog — Guides on Airtime, Data, Bills & Streaming | Ruxx Digital Services",
    description: "Practical guides on airtime, data, electricity tokens, cable TV subscriptions, movie streaming and staying safe online in Nigeria.",
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

    // Unknown/removed blog posts (e.g. articles deleted from articles.js) must
    // drop out of search indexes instead of lingering as soft 404s.
    const isRemovedPost = path.startsWith("/blog/") && !getBlogPostSEO(path);
    setMeta("robots", isRemovedPost ? "noindex, nofollow" : "index, follow");

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
