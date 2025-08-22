import React, { useState, useEffect, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ShieldCheck, Zap, BadgeDollarSign, Headphones, Star, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';


import './App.css';

import img1 from './assets/images/img1.jpg';
import img2 from './assets/images/img2.jpg';
import img3 from './assets/images/img3.jpg';
import img4 from './assets/images/img4.jpg';
import img5 from './assets/images/img5.jpg';
import logo from './assets/logo.png';
import banner from './assets/banner.png';



const images = [img1, img2, img3, img4, img5];

const StarRow = ({ value = 0, onChange }) => {
  const [hover, setHover] = useState(0);
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="star-row">
      {stars.map((s) => (
        <button
          key={s}
          type="button"
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange?.(s)}
          aria-label={`Rate ${s} star${s > 1 ? 's' : ''}`}
        >
          <Star className={`star ${ (hover || value) >= s ? 'filled' : ''}`} />
        </button>
      ))}
    </div>
  );
};

export default function App() {
  const autoplay = useMemo(() => Autoplay({ delay: 4500, stopOnInteraction: false }), []);
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'center', skipSnaps: false }, [autoplay]);

  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState([
    { id: 1, name: 'Adaeze O.', rating: 5, text: 'Super fast airtime top-ups. Clean UI and great support.' },
    { id: 2, name: 'Emmanuel K.', rating: 4, text: 'TV subscription was instant. Would love Apple Pay in the future.' },
  ]);

  const avgRating = useMemo(() => {
    if (!feedback.length) return 0;
    const sum = feedback.reduce((acc, f) => acc + f.rating, 0);
    return (sum / feedback.length).toFixed(1);
  }, [feedback]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setFeedback((prev) => [
      { id: Date.now(), name: name || 'Anonymous', rating, text: message.trim() },
      ...prev,
    ]);
    setMessage('');
    setName('');
    setRating(5);
  };

  useEffect(() => {
    return () => {
      try { autoplay.stop?.(); } catch {}
    };
  }, [autoplay]);

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-content">
          <div className="logo">
            <img src={logo} alt="Ruxx Logo" className="logo-img" />
          </div>
          <nav className="links">
            <a href="#features">Features</a>
            <a href="#faq">FAQ</a>
            <a href="#download" className="btn">Get the App</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
  <div className="hero-grid">
    <h1 className='text'>Smarter Payments. <br /> <span className="muted">Zero Stress.</span></h1>
    {/* Banner Image Section */}
    <div className="hero-banner fade-in">
      <img src={banner} alt="Ruxx Services Banner" className="banner-img" />

       {/* Call-to-Action Buttons */}
    <div id="download" className="download-btns">
      <a href="https://play.google.com" className="btn">Download for Android</a>
      <a href="https://apps.apple.com" className="btn outline">Download for iOS</a>
    </div>
    </div>

   

    {/* Trust Text */}
    <div className="trust-text">
      Trusted by {feedback.length} users • Avg rating {avgRating}/5
    </div>

    {/* Carousel Section (unchanged) */}
    <div
      className="hero-carousel"
      ref={emblaRef}
      style={{ "--count": images.length }}
    >
      <div className="embla__container">
        {images.map((src, idx) => (
          <div className="embla__slide" key={idx}>
            <img src={src} alt={`slide ${idx + 1}`} className="slide-img" style={{ "--i": idx }} />
          </div>
        ))}
      </div>
    </div>
    
  </div>
</section>

      {/* FEATURES */}
      <section id="features" className="features">
        <h2 className="section-title">Why Ruxx Digital Service</h2>
        <p className="section-sub">Elegant, dependable payments for everyday life.</p>
        <div className="features-grid">
          <div className="feature-card"><ShieldCheck /> Bank-grade Security</div>
          <div className="feature-card"><Zap /> Instant Delivery</div>
          <div className="feature-card"><BadgeDollarSign /> Transparent Rates</div>
          <div className="feature-card"><Headphones /> 24/7 Support</div>
        </div>
      </section>

      {/* FEEDBACK */}
      <section className="feedback">
        <h2 className="section-title">What users say</h2>
        <form className="feedback-form" onSubmit={handleSubmit}>
          <label>Rating <StarRow value={rating} onChange={setRating} /></label>
          <input placeholder="Your name" value={name} onChange={(e)=>setName(e.target.value)} />
          <textarea placeholder="Your feedback" value={message} onChange={(e)=>setMessage(e.target.value)} />
          <button type="submit" className="btn">Submit</button>
        </form>
        <div className="feedback-list">
          {feedback.map(f=>(
            <div key={f.id} className="feedback-card fade-in">
              <div className="f-head">
                <strong>{f.name}</strong> – {f.rating}/5
              </div>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
<section id="faq" className="faq">
  <h2 className="section-title">Frequently Asked Questions</h2>
  <div className="faq-list">
    <details>
      <summary>Is Ruxx Digital Services safe to use?</summary>
      <p>Yes. We use bank-grade security and encrypted transactions to protect your data and money.</p>
    </details>
    <details>
      <summary>How fast are transactions?</summary>
      <p>All payments (airtime, data, TV, electricity) are processed instantly, usually within seconds.</p>
    </details>
    <details>
      <summary>Can I get a refund if something goes wrong?</summary>
      <p>Yes. If your transaction fails, you’re either refunded immediately or within 24 hours.</p>
    </details>
    <details>
      <summary>Which devices are supported?</summary>
      <p>You can use Ruxx Digital Services on any Android or iOS device via our mobile app (ruxxpay) .</p>
    </details>
  </div>
</section>


            {/* FOOTER */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Ruxx Digital Service. All rights reserved.</p>
        
        <div className="footer-links">
          <a href="mailto:info@ruxxdigital.name.ng" aria-label="Email">
            <Mail size={20} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
        </div>
      </footer>

    </div>
  );
}
