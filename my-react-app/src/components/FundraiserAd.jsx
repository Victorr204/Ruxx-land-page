import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, HeartHandshake, Image as ImageIcon } from "lucide-react";
import { DONATE_URL } from "@/components/FundraiserBanner";
import adBanner from "@/assets/images/ruxx-prepaid-advert.webp";

/* ──────────────────────────────────────────────────────────────
   ADVERT IMAGE
   Currently using: src/assets/images/ruxx-prepaid-advert.webp
     (optimised copy of ruxx-prepaid-advert.png — 1.7 MB → 124 KB)
   To swap it later, either import another file and assign it here,
   or point at a file in public/:  AD_IMAGE = "/fundraiser-ad.png"
   Set to null to show the placeholder box instead.
   ────────────────────────────────────────────────────────────── */
const AD_IMAGE = adBanner;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 },
  }),
};

function AdImage() {
  const [failed, setFailed] = useState(false);

  /* Placeholder — replace by setting AD_IMAGE above */
  if (!AD_IMAGE || failed) {
    return (
      <div
        style={{
          aspectRatio: "16 / 10",
          width: "100%",
          border: "2px dashed var(--border)",
          borderRadius: "1.25rem",
          background: "var(--section-alt)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          padding: "1.5rem",
          textAlign: "center",
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{ width: "2.75rem", height: "2.75rem", borderRadius: "0.875rem", background: "rgba(124,58,237,0.1)", color: "var(--primary)" }}
        >
          <ImageIcon style={{ width: "20px", height: "20px" }} />
        </div>
        <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--foreground)" }}>
          Advert image placeholder
        </p>
        <p style={{ fontSize: "12px", lineHeight: 1.6, color: "var(--muted-foreground)", maxWidth: "22rem" }}>
          Drop your fundraiser banner into <code>public/fundraiser-ad.png</code>, then set{" "}
          <code>AD_IMAGE = &quot;/fundraiser-ad.png&quot;</code> at the top of{" "}
          <code>src/components/FundraiserAd.jsx</code>.
        </p>
      </div>
    );
  }

  return (
    <a
      href={DONATE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Support the Ruxx Prepaid launch — donate what you can"
      className="block group"
      style={{ borderRadius: "1.25rem" }}
    >
      <img
        src={AD_IMAGE}
        alt="Ruxx Digital Services App Banner — support the Ruxx Prepaid launch"
        onError={() => setFailed(true)}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          borderRadius: "1.25rem",
          border: "1px solid var(--card-border)",
          transition: "transform 0.25s, box-shadow 0.25s",
        }}
        className="group-hover:scale-[1.01] group-hover:shadow-lg"
      />
    </a>
  );
}

export default function FundraiserAd() {
  return (
    <section className="py-12 md:py-16" aria-label="Ruxx Prepaid launch fundraiser">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="rounded-3xl border overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.07) 0%, rgba(245,158,11,0.09) 100%)",
            borderColor: "var(--card-border)",
          }}
        >
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center" style={{ padding: "1.5rem" }}>
            {/* Copy */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full mb-4" style={{ gap: "0.5rem", padding: "0.25rem 0.75rem", background: "rgba(245,158,11,0.12)" }}>
                <HeartHandshake style={{ width: "13px", height: "13px", color: "var(--gold)" }} />
                <span className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: "var(--gold)" }}>
                  Launch Campaign
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-3" style={{ letterSpacing: "-0.025em", lineHeight: 1.15 }}>
                Help us launch <span className="gradient-text">Ruxx Prepaid.</span>
              </h2>

              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted-foreground)" }}>
                Ruxx Prepaid is built and ready to go live — we&apos;re only{" "}
                <strong style={{ color: "var(--foreground)" }}>&#8358;1,500,000 (about $1,000)</strong> short of our
                launch target. Support with whatever you can; no amount is too small.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { label: "Goal", value: "\u20A61.5M" },
                  { label: "Short by", value: "\u2248 $1,000" },
                  { label: "Minimum", value: "Any amount" },
                ].map((chip) => (
                  <span
                    key={chip.label}
                    className="text-[11px] font-medium rounded-full px-2.5 py-1"
                    style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", color: "var(--muted-foreground)" }}
                  >
                    {chip.label}:{" "}
                    <strong style={{ color: "var(--foreground)" }}>{chip.value}</strong>
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap" style={{ gap: "0.75rem" }}>
                <a
                  href={DONATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                  style={{ padding: "0.75rem 1.5rem", background: "var(--primary)", color: "var(--primary-foreground)" }}
                >
                  Donate what you can <ArrowRight style={{ width: "16px", height: "16px" }} />
                </a>
                <Link
                  to="/ruxx-prepaid"
                  className="inline-flex items-center gap-2 rounded-xl text-sm font-medium transition-all hover:bg-muted"
                  style={{ padding: "0.75rem 1.5rem", border: "1px solid var(--border)", color: "var(--foreground)" }}
                >
                  See what we&apos;re building
                </Link>
              </div>
            </div>

            {/* Advert image (placeholder until AD_IMAGE is set) */}
            <div style={{ position: "relative" }}>
              <AdImage />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
