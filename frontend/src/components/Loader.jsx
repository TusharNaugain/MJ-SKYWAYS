import { useState, useEffect } from 'react';

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="loader" className={!loading ? 'out' : ''}>
      <div style={{
        width: '110px',
        height: '110px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 20px 60px rgba(201,169,110,0.25)',
        marginBottom: '0.4rem'
      }}>
        <img
          src="/images/logo.jpeg"
          alt="M Jayalakshmi Skyway"
          style={{ width: '92%', height: '92%', objectFit: 'contain' }}
        />
      </div>
      <div className="ld-logo" style={{ fontSize: '1.2rem' }}>M Jayalakshmi <span>Skyway</span></div>
      <div className="ld-bar"><div className="ld-fill"></div></div>
      <div className="ld-text">Initializing Systems…</div>
    </div>
  );
}
