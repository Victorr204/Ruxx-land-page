import React, { useState, useEffect } from 'react';
import '../src/style.css';
import img1 from './assets/images/img1.jpg';
import img2 from './assets/images/img2.jpg';
import img3 from './assets/images/img3.jpg';
import img4 from './assets/images/img4.jpg';
import img5 from './assets/images/img5.jpg';

const images = [img1, img2, img3, img4, img5];

const App = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <style>
        {`
          @media (max-width: 600px) {
            .download-button {
              font-size: 0.8em !important;
              padding: 10px 12px !important;
              min-width: 120px !important;
              flex: 1 1 auto;
            }
          }
        `}
      </style>

      <header style={styles.header}>
        <h1 style={styles.title}>Ruxx</h1>
        <p>payment made easy</p>

        <div style={styles.downloadLinks}>
          <a
            href="https://play.google.com/store/apps/details?id=your.app.id"
            className="download-button"
            style={styles.button}
          >
            Download for Android
          </a>
          <a
            href="https://apps.apple.com/us/app/your-app-name/idyourappid"
            className="download-button"
            style={styles.button}
          >
            Download for iOS
          </a>
        </div>
        <br />
        <p style={styles.tagline}>Smarter Way to Pay — Anywhere, Anytime</p>
      </header>

      <section style={styles.content}>
        <p>
          Ruxx is your all-in-one mobile payment app. Instantly purchase airtime,
          data, TV subscriptions, and electricity bills in seconds — no stress,
          no queues.
        </p>
        <div style={styles.slider}>
          <img
            src={images[currentImageIndex]}
            alt="images"
            style={styles.sliderImage}
          />
        </div>
        <p style={styles.subtext}>
          Experience fast, secure, and seamless payments at your fingertips.
        </p>
      </section>

      {/* Footer Section */}
      <footer style={styles.footer}>
  <p>© {new Date().getFullYear()} Ruxx. All rights reserved.</p>
  <div style={styles.socialLinks}>
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <img src="https://cdn-icons-png.flaticon.com/24/733/733547.png" alt="Facebook" style={styles.icon} />
    </a>
    
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
      <img src="https://cdn-icons-png.flaticon.com/24/733/733558.png" alt="Instagram" style={styles.icon} />
    </a>

   <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
  <img src="https://cdn-icons-png.flaticon.com/24/5968/5968958.png" alt="X" style={styles.icon} />
</a>

<a href="mailto:support@ruxxapp.com" target="_blank" rel="noopener noreferrer">
  <img src="https://cdn-icons-png.flaticon.com/24/732/732200.png" alt="Gmail" style={styles.icon} />
</a>

  </div>
</footer>

    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '30px',
    backgroundColor: '#e6f4ea',
    color: '#2e7d32',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  header: {
    marginBottom: '25px',
  },
  title: {
    fontSize: '3em',
    fontWeight: 'bold',
    color: '#1b5e20',
  },
  tagline: {
    fontSize: '1.5em',
    fontWeight: '500',
    color: '#388e3c',
  },
  content: {
    maxWidth: '700px',
    margin: '0 auto',
    fontSize: '1.2em',
  },
  subtext: {
    marginTop: '15px',
    color: '#4caf50',
  },
  slider: {
    marginTop: '30px',
    marginBottom: '30px',
    width: '100%',
    overflow: 'hidden',
  },
  sliderImage: {
    width: '100%',
    maxWidth: '600px',
    height: '500px',
    objectFit: 'cover',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
  },
  downloadLinks: {
    marginTop: '25px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    flexWrap: 'nowrap',
    flexDirection: 'row',
  },
  button: {
    minWidth: '160px',
    padding: '12px 20px',
    backgroundColor: '#43a047',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '1em',
    transition: 'background-color 0.3s ease',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginTop: '50px',
    borderTop: '1px solid #c8e6c9',
    paddingTop: '20px',
    fontSize: '0.9em',
    color: '#2e7d32',
  },
  socialLinks: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  icon: {
  width: '24px',
  height: '24px',
  transition: 'transform 0.2s',
  cursor: 'pointer',
 
},

};

export default App;
