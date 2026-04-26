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
        width: '180px',
        height: '120px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 20px 60px rgba(201,169,110,0.25)',
        marginBottom: '0.4rem',
        overflow: 'hidden'
      }}>
        <img
          src="/images/logo.jpeg"
          alt="MJ Skyways"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
      <div className="ld-logo">MJ <span>Skyways</span></div>
      <div className="ld-bar"><div className="ld-fill"></div></div>
      <div className="ld-text">Initializing Systems…</div>
    </div>
  );
}
