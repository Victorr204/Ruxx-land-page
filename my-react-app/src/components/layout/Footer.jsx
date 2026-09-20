import { Link } from "react-router-dom";
import { Mail, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { icon: <Mail size={16} />, href: "mailto:info@ruxxdigital.name.ng", label: "Email" },
    { icon: <Instagram size={16} />, href: "https://www.instagram.com/ruxx_digital_services?igsh=MTU1a3Rhd2V4b3phag==", label: "Instagram" },
  ];

  return (
    <footer className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-3">
              <img src={logo} alt="Ruxx" className="h-8 w-auto rounded-lg" />
              <div className="flex flex-col leading-none">
                <span className="font-bold text-sm text-foreground tracking-tight">Ruxx</span>
                <span className="text-[8px] text-gold font-semibold tracking-[0.15em] uppercase">Digital Services</span>
              </div>
            </Link>
            <p className="text-[13px] text-muted-foreground leading-relaxed max-w-xs">
              Smarter payments for everyday life. A subsidiary of Kognatix Ltd.
            </p>
            <div className="flex gap-2 mt-4">
              {socials.map((s, i) => (
                <a key={i} href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                  style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Products</h4>
            <ul className="space-y-2">
              <li><Link to="/ruxxpay" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">RuxxPay</Link></li>
              <li><Link to="/ruxx-card" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Ruxx Card</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
              <li><Link to="/privacy" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left" style={{ borderColor: "var(--border)" }}>
          <p className="text-[12px] text-muted-foreground">&copy; {year} Ruxx Digital Services.</p>
          <p className="text-[11px] text-muted-foreground/60">A subsidiary of <span className="text-gold font-medium">Kognatix Ltd</span></p>
        </div>
      </div>
    </footer>
  );
}
