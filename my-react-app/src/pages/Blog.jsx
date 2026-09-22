import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import articles from "@/lib/articles";
import AdUnit from "@/components/AdUnit";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.05 } }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function Blog() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-100" />
        <div className="absolute inset-0 transition-colors duration-300" style={{ background: "var(--hero-gradient)" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full mb-4" style={{ padding: "0.375rem 0.875rem", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)" }}>
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] font-semibold text-primary" style={{ letterSpacing: "0.05em" }}>Blog</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
              Insights & <span className="gradient-text">Guides</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Stay informed about digital payments, fintech trends, and practical guides for managing your finances in Nigeria.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            {articles.map((article, i) => (
              <motion.article key={article.slug} variants={fadeUp} custom={i}>
                <Link
                  to={`/blog/${article.slug}`}
                  className="block rounded-2xl border card-hover group overflow-hidden"
                  style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
                >
                  {article.image && (
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-semibold rounded-full px-2.5 py-0.5 uppercase tracking-wider" style={{ background: "rgba(124,58,237,0.08)", color: "var(--primary)" }}>
                        {article.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--muted-foreground)" }}>
                        <Calendar style={{ width: "12px", height: "12px" }} />
                        {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--muted-foreground)" }}>
                        <Clock style={{ width: "12px", height: "12px" }} />
                        {article.readTime}
                      </div>
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-[13px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
          <AdUnit />
        </div>
      </section>
    </motion.div>
  );
}
