export default function Network() {
  return (
    <section id="network" style={{ padding: '8rem 0', background: 'var(--navy-mid)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="s-label rv" style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1rem' }}>Our Footprint</p>
          <h2 className="s-title rv" style={{ fontFamily: 'var(--ff-display)', fontSize: '3rem', fontWeight: 300, color: '#fff' }}>Global <strong>Network</strong> &amp; Markets</h2>
          <div className="divider rv" style={{ margin: '0 auto', width: '60px', height: '2px', background: 'var(--gold)' }}></div>
        </div>

        <div className="rv" style={{ 
          width: '100%', 
          height: '500px', 
          borderRadius: '12px', 
          overflow: 'hidden', 
          border: '1px solid rgba(255,255,255,0.05)', 
          marginBottom: '3rem',
          position: 'relative'
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--navy-mid), transparent 30%)', zIndex: 1 }}></div>
          <img 
            src="/images/why-us/feat_network_1774798016753.png" 
            alt="Global Network Map" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        <div className="regions-g" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
          {['South Asia', 'Middle East & GCC', 'Southeast Asia', 'East Asia & China', 'Europe', 'North America', 'Africa', 'CIS & Central Asia'].map((region, i) => (
            <div key={i} className="reg-chip rv" style={{ 
              background: '#0b162c', 
              border: '1px solid rgba(201,169,110,0.15)', 
              borderRadius: '6px', 
              padding: '1.2rem 1.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              transition: 'all 0.3s ease'
            }}>
              <div className="reg-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)' }}></div>
              <div className="reg-name" style={{ fontSize: '0.9rem', fontWeight: 500, color: '#fff', letterSpacing: '0.05em' }}>{region}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
