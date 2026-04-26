import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ onOpenModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Make sure we scroll to top on route change cleanly
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const toggleMob = () => setMobOpen(!mobOpen);
  const closeMob = () => setMobOpen(false);

  return (
    <>
      {/* MOBILE NAV */}
      <div className={`mob-nav ${mobOpen ? 'open' : ''}`} id="mobNav">
        <ul>
          <li><Link to="/" onClick={closeMob}>Home</Link></li>
          <li><Link to="/about" onClick={closeMob}>About</Link></li>
          <li><Link to="/services" onClick={closeMob}>Services</Link></li>
          <li><Link to="/why-us" onClick={closeMob}>Why Us</Link></li>
          <li><Link to="/contact" onClick={closeMob}>Contact</Link></li>
        </ul>
      </div>

      {/* NAV */}
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none' }}>
          <div style={{ width: '120px', height: '80px', backgroundColor: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
             <img src="/images/logo.jpeg" alt="MJ Skyways" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.target.style.display='none'; e.target.parentNode.innerHTML = '<span style="color:#0a1128;font-weight:900;font-size:14px;letter-spacing:-1px;">MJS</span>'; }}/>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', whiteSpace: 'nowrap' }}>
            <span style={{ color: '#fff', fontSize: '1.35rem', lineHeight: 1.1, fontFamily: 'var(--ff-display)' }}><strong>MJ SKYWAYS</strong></span>
            <span style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 500, fontFamily: 'var(--ff-body)', letterSpacing: '0.1em', marginTop: '2px', textTransform: 'uppercase' }}>Global Private Limited</span>
          </div>
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/why-us">Why Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className={`hamburger ${mobOpen ? 'open' : ''}`} onClick={toggleMob}>
          <span></span><span></span><span></span>
        </div>
      </nav>
    </>
  );
}
