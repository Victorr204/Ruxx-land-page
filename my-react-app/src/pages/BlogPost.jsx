import { Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, BookOpen, Share2 } from "lucide-react";
import articles from "@/lib/articles";
import AdUnit from "@/components/AdUnit";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function BlogPost() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Article not found</h1>
          <p className="text-sm text-muted-foreground mb-4">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const nextArticle = articles[currentIndex + 1] || articles[0];
  const prevArticle = articles[currentIndex - 1] || articles[articles.length - 1];

  const shareUrl = `https://ruxxdigital.name.ng/blog/${article.slug}`;

  const breadcrumbLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ruxxdigital.name.ng/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://ruxxdigital.name.ng/blog" },
      { "@type": "ListItem", position: 3, name: article.title, item: shareUrl },
    ],
  };

  const articleLD = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Organization", name: "Ruxx Digital Services" },
    publisher: { "@type": "Organization", name: "Ruxx Digital Services" },
    url: shareUrl,
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: article.title, text: article.excerpt, url: shareUrl });
      } catch (error) {
        void error;
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
    }
  };

  const paragraphs = article.content.split("\n\n");

  const renderParagraph = (paragraph, i) => {
    if (paragraph.startsWith("## ")) {
      return <h2 key={i} className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">{paragraph.replace("## ", "")}</h2>;
    }
    if (paragraph.startsWith("### ")) {
      return <h3 key={i} className="text-lg font-bold text-foreground mt-8 mb-3">{paragraph.replace("### ", "")}</h3>;
    }
    if (paragraph.startsWith("| ")) {
      const rows = paragraph.split("\n").filter((r) => r.startsWith("|"));
      const headers = rows[0].split("|").filter(Boolean).map((h) => h.trim());
      const data = rows.slice(2).map((row) => row.split("|").filter(Boolean).map((c) => c.trim()));
      return (
        <div key={i} className="overflow-x-auto my-6">
          <table className="w-full text-[13px] border" style={{ borderColor: "var(--border)" }}>
            <thead>
              <tr style={{ background: "var(--section-alt)" }}>
                {headers.map((h, j) => (
                  <th key={j} className="px-4 py-2.5 text-left font-semibold text-foreground border-b" style={{ borderColor: "var(--border)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, j) => (
                <tr key={j} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                  {row.map((cell, k) => (
                    <td key={k} className="px-4 py-2.5 text-muted-foreground" style={{ borderColor: "var(--border)" }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (paragraph.startsWith("- ") || paragraph.startsWith("1. ")) {
      const items = paragraph.split("\n").filter((l) => l.trim());
      return (
        <ul key={i} className="space-y-2 my-4">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-[14px] text-muted-foreground leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              {item.replace(/^[-\d.]+\s*/, "")}
            </li>
          ))}
        </ul>
      );
    }
    return <p key={i} className="text-[14px] text-muted-foreground leading-relaxed my-4">{paragraph}</p>;
  };

  return (
    <motion.div initial="hidden" animate="visible">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLD) }} />
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-100" />
        <div className="absolute inset-0 transition-colors duration-300" style={{ background: "var(--hero-gradient)" }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div variants={fadeUp}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-[13px] font-medium mb-6" style={{ color: "var(--muted-foreground)" }}>
              <ArrowLeft style={{ width: "16px", height: "16px" }} /> Back to Blog
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-semibold rounded-full px-2.5 py-0.5 uppercase tracking-wider" style={{ background: "rgba(124,58,237,0.08)", color: "var(--primary)" }}>
                {article.category}
              </span>
              <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--muted-foreground)" }}>
                <Calendar style={{ width: "12px", height: "12px" }} />
                {new Date(article.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
              <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--muted-foreground)" }}>
                <Clock style={{ width: "12px", height: "12px" }} />
                {article.readTime}
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {article.excerpt}
            </p>
            {article.image && (
              <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "var(--card-border)" }}>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-auto object-cover"
                  width="1200"
                  height="630"
                  style={{ maxHeight: "400px" }}
                  loading="eager"
                />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article variants={fadeUp} className="prose-custom">
            {paragraphs.map((paragraph, i) => {
              if (i === Math.floor(paragraphs.length / 2)) {
                return (
                  <Fragment key={i}>
                    <AdUnit />
                    {renderParagraph(paragraph, i)}
                  </Fragment>
                );
              }
              return renderParagraph(paragraph, i);
            })}
          </motion.article>

          <div className="flex items-center justify-between mt-12 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
            <button onClick={handleShare} className="inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" /> Share this article
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <Link to={`/blog/${prevArticle.slug}`} className="rounded-xl p-5 border transition-all hover:border-primary/20" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Previous</span>
              <p className="text-sm font-bold text-foreground mt-1 line-clamp-2">{prevArticle.title}</p>
            </Link>
            <Link to={`/blog/${nextArticle.slug}`} className="rounded-xl p-5 border text-right transition-all hover:border-primary/20" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Next</span>
              <p className="text-sm font-bold text-foreground mt-1 line-clamp-2">{nextArticle.title}</p>
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
