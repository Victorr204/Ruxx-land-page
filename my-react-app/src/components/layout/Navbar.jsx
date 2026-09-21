import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/theme";
import logo from "@/assets/logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/ruxxpay", label: "RuxxPay" },
  { to: "/ruxx-card", label: "Ruxx Card" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <>
      <header
        className="fixed z-50 transition-all duration-300"
        style={{
          top: "1rem",
          left: "1rem",
          right: "1rem",
          maxWidth: "80rem",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "var(--nav-bg)",
          border: scrolled ? "3px solid var(--primary)" : "3px solid var(--border)",
          borderRadius: "1rem",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div style={{ maxWidth: "80rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "1rem", paddingRight: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4.5rem" }}>
            {/* Logo */}
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
              <img src={logo} alt="Ruxx" style={{ height: "2.5rem", width: "auto", borderRadius: "0.5rem" }} />
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1, gap: "2px" }}>
                <span className="font-black text-foreground" style={{ fontSize: "1.1rem", letterSpacing: "-0.025em" }}>Ruxx</span>
                <span className="text-gold font-bold" style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Digital Services</span>
              </div>
            </Link>

            {/* Desktop Nav — hidden on mobile, visible on lg */}
            <nav className="hidden lg:flex items-center" style={{ gap: "0.25rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
              {navLinks.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative rounded-lg text-sm font-medium transition-all duration-200 ${
                      active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                    style={{ padding: "0.5rem 1rem", fontSize: "13px" }}
                  >
                    {active && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: theme === "dark" ? "rgba(167,139,250,0.1)" : "rgba(124,58,237,0.08)",
                        }}
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right side — always visible */}
            <div className="flex items-center" style={{ gap: "0.5rem", flexShrink: 0 }}>
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <Link
                to="/ruxxpay"
                className="hidden lg:inline-flex items-center bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all"
                style={{ gap: "0.375rem", padding: "0.5rem 1.25rem", fontSize: "13px" }}
              >
                Get App <ArrowRight style={{ width: "14px", height: "14px" }} />
              </Link>

              <button
                className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed z-40 lg:hidden"
            style={{
              top: "5.25rem",
              left: "1rem",
              right: "1rem",
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "1rem",
            }}
          >
            <nav style={{ maxWidth: "80rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.75rem", paddingBottom: "0.75rem", display: "flex", flexDirection: "column", gap: "0.125rem" }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    to={link.to}
                    className="block rounded-lg font-medium transition-colors"
                    style={{
                      padding: "0.625rem 1rem",
                      fontSize: "14px",
                      backgroundColor: location.pathname === link.to ? "rgba(124,58,237,0.1)" : "transparent",
                      color: location.pathname === link.to ? "var(--primary)" : "var(--muted-foreground)",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                to="/ruxxpay"
                className="mt-2 flex items-center justify-center bg-primary text-primary-foreground rounded-lg font-semibold"
                style={{ gap: "0.375rem", padding: "0.625rem 1.25rem", fontSize: "14px" }}
              >
                Get App <ArrowRight style={{ width: "16px", height: "16px" }} />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
