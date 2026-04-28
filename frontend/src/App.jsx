import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Route Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ServicesPage from './pages/ServicesPage';
import WhyUsPage from './pages/WhyUsPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  // Replicate native toast
  const [toastMsg, setToastMsg] = useState({ msg: '', type: 'ok', show: false });

  const showToast = (msg, type = 'ok') => {
    setToastMsg({ msg, type, show: true });
    setTimeout(() => setToastMsg(prev => ({ ...prev, show: false })), 4000);
  };

  // Multi-page scroll reveal setup matching native script
  useEffect(() => {
    const rvObs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            e.target.classList.add('vis');
          }, i * 70);
        }
      });
    }, { threshold: 0.1 });

    const setupObserver = () => {
      const els = document.querySelectorAll('.rv:not(.vis)');
      els.forEach(el => rvObs.observe(el));
    }

    const scanInterval = setInterval(setupObserver, 500);

    return () => {
      clearInterval(scanInterval);
    };
  }, []);

  return (
    <>
      <Cursor />
      <Loader />

      {/* Toast Replacement mapped to CSS styles */}
      <div className={`toast ${toastMsg.type} ${toastMsg.show ? 'show' : ''}`} id="toast">
        {toastMsg.msg}
      </div>

      <Navbar />

      {/* Application Routing Logic */}
      <div style={{minHeight: '80vh'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/why-us" element={<WhyUsPage />} />
          <Route path="/contact" element={<ContactPage showToast={showToast} />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}
