export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="ft-g">
          <div className="ft-brand">
            <a href="#hero" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none', marginBottom: '1.5rem' }}>
              <div style={{ width: '120px', height: '80px', backgroundColor: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                 <img src="/images/logo.jpeg?v=2" alt="MJ Skyways" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.target.style.display='none'; e.target.parentNode.innerHTML = '<span style="color:#0a1128;font-weight:900;font-size:14px;letter-spacing:-1px;">MJS</span>'; }}/>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', whiteSpace: 'nowrap' }}>
                <span style={{ color: '#fff', fontSize: '1.35rem', lineHeight: 1.1, fontFamily: 'var(--ff-display)' }}><strong>MJ SKYWAYS</strong></span>
                <span style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 500, fontFamily: 'var(--ff-body)', letterSpacing: '0.1em', marginTop: '2px', textTransform: 'uppercase' }}>Global Private Limited</span>
              </div>
            </a>
            <p style={{ marginTop: '0.5rem' }}>A globally trusted partner across logistics, aviation, hospitality, and international trade — delivering excellence across every border.</p>
          </div>
          <div className="ft-col"><h4>Services</h4><ul><li><a href="#services">Logistics</a></li><li><a href="#services">Aviation Support</a></li><li><a href="#services">Hospitality</a></li><li><a href="#services">PSU Services</a></li><li><a href="#services">International Trade</a></li></ul></div>
          <div className="ft-col"><h4>Company</h4><ul><li><a href="#about">About Us</a></li><li><a href="#values">Core Values</a></li><li><a href="#leadership">Leadership</a></li><li><a href="#network">Global Network</a></li><li><a href="#future">Future Goals</a></li></ul></div>
          <div className="ft-col"><h4>Contact</h4><ul><li><a href="mailto:info@mjskyways.com">info@mjskyways.com</a></li><li><a href="tel:+919289080349">+91 92890 80349</a></li><li><a href="#contact">Send a Message</a></li></ul></div>
        </div>
        <div className="ft-bottom">
          <p>© 2025 MJ SKYWAYS GLOBAL PRIVATE LIMITED. All rights reserved.</p>
          <p style={{color: 'var(--slate)'}}>Connecting Businesses Across Borders</p>
        </div>
      </div>
    </footer>
  );
}
