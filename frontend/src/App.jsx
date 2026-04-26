import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { auth } from './firebase';
import api from './utils/api';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import AdminDashboard from './components/AdminDashboard';

// Route Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ServicesPage from './pages/ServicesPage';
import WhyUsPage from './pages/WhyUsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  const [user, setUser] = useState(null);
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isDashOpen, setDashOpen] = useState(false);

  // Replicate native toast
  const [toastMsg, setToastMsg] = useState({ msg: '', type: 'ok', show: false });
  const navigate = useNavigate();
  const location = useLocation();

  const showToast = (msg, type = 'ok') => {
    setToastMsg({ msg, type, show: true });
    setTimeout(() => setToastMsg(prev => ({ ...prev, show: false })), 4000);
  };

  // 15-second Auto-Login Redirect for guests
  useEffect(() => {
    const timer = setTimeout(() => {
      const isAuthPage = location.pathname === '/login';
      // Safety check: Don't redirect if already logged in or already on login page
      const hasAccess = localStorage.getItem('mjs_access') || auth.currentUser;
      
      if (!hasAccess && !isAuthPage) {
        navigate('/login');
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [navigate, location.pathname]);

  useEffect(() => {
    const fetchMe = async () => {
      if (localStorage.getItem('mjs_access')) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data.user);
        } catch (e) {
          localStorage.removeItem('mjs_access');
        }
      }
    };
    fetchMe();
  }, []);

  // Multi-page scroll reveal setup matching native script
  useEffect(() => {
    // Observer setup function inside here safely triggers on dom changes
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
    
    // Bind interval so we constantly scan for new `.rv` tokens across route changes
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

      <AdminDashboard isOpen={isDashOpen} onClose={() => setDashOpen(false)} showToast={showToast} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} onLoginSuccess={(u) => { setUser(u); if(u.role==='admin') setTimeout(()=>setDashOpen(true), 600); }} showToast={showToast} />

      {/* Dynamic Nav Button Replace */}
      <div style={{display:'none'}} id="react-auth-inject">
        {user ? (
          <div className="user-bar" style={{position:'fixed', zIndex: 1001, top:'1.3rem', right:'3.5rem'}}>
            <div className="u-av">{user.firstName[0].toUpperCase()}</div>
            <span style={{color:'var(--white)'}}>{user.firstName}</span>
            {user.role === 'admin' ? <button className="btn-portal" onClick={() => setDashOpen(true)}>Dashboard</button> : null}
            <button className="btn-portal" onClick={() => { localStorage.removeItem('mjs_access'); setUser(null); showToast('Signed out successfully.', 'ok'); }}>Sign Out</button>
          </div>
        ) : null}
      </div>

      <Navbar onOpenModal={() => setAuthOpen(true)} />
      
      {/* Application Routing Logic */}
      <div style={{minHeight: '80vh'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/why-us" element={<WhyUsPage />} />
          <Route path="/contact" element={<ContactPage showToast={showToast} />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}
