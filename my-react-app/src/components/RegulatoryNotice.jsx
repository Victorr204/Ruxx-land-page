import { ShieldCheck } from "lucide-react";

export default function RegulatoryNotice({ variant = "compact", title = "Regulatory Notice" }) {
  const full = variant === "full";

  return (
    <div
      className="rounded-2xl border"
      style={{ padding: full ? "1.5rem" : "1rem", background: "var(--card-bg)", borderColor: "var(--card-border)" }}
    >
      <div className="flex items-center gap-2" style={{ marginBottom: "0.75rem" }}>
        <ShieldCheck className="w-4 h-4 text-primary" style={{ flexShrink: 0 }} />
        <h3 className="text-[13px] font-bold text-foreground" style={{ letterSpacing: "0.02em" }}>{title}</h3>
      </div>

      <div className="text-[13px] text-muted-foreground" style={{ lineHeight: 1.7 }}>
        <p style={{ marginBottom: full ? "0.75rem" : "0.5rem" }}>
          <strong className="text-foreground">ruxx prepaid</strong> (operated by{" "}
          <strong className="text-foreground">Ruxx Digital Services</strong>) is a Value-Added Services (VAS) utility
          management platform and digital reseller. <strong className="text-foreground">ruxx prepaid is not a bank, Mobile
          Money Operator (MMO), or financial institution.</strong>
        </p>
        <p style={{ marginBottom: full ? "0.75rem" : "0.5rem" }}>
          We do not accept bank deposits or process monetary transfers. All payment collections and collection
          accounts are handled securely by <strong className="text-foreground">Paystack</strong> (PCI-DSS Level 1
          Certified), operating under its own Central Bank of Nigeria (CBN) licence.
        </p>
        <p style={{ marginBottom: 0 }}>
          All funds held in user accounts represent non-transferable, non-interest-bearing{" "}
          <strong className="text-foreground">Prepaid Utility Credits</strong> strictly used for purchasing airtime,
          internet data, electricity tokens, and TV subscriptions within the platform. Credits{" "}
          <strong className="text-foreground">cannot be withdrawn</strong> to a bank account, transferred to another
          user, or redeemed for cash.
        </p>
        {full && (
          <p style={{ marginTop: "0.75rem", marginBottom: 0 }}>
            Because users cannot move money out of the platform, CBN deposit-taking and Mobile Money Operator licensing
            does not apply to Ruxx Digital Services. Collection is performed entirely by Paystack under its own CBN
            licence.
          </p>
        )}
      </div>
    </div>
  );
}
