import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import RuxxPay from "@/pages/RuxxPay";
import RuxxCard from "@/pages/RuxxCard";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Paystack from "@/pages/Paystack";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/ruxxpay" element={<RuxxPay />} />
            <Route path="/ruxx-card" element={<RuxxCard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/paystack" element={<Paystack />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
