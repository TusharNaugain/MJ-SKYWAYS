export default function Future() {
  return (
    <section id="future" style={{ position: 'relative', overflow: 'hidden' }}>
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'url(/images/why-us/feat_tech_1774798067613.png) center/cover no-repeat fixed',
          opacity: 0.15,
          zIndex: 0 
        }}
      ></div>
      <div className="container future-c" style={{ position: 'relative', zIndex: 1 }}>
        <div className="center-head">
          <p className="s-label rv">Looking Forward</p>
          <h2 className="s-title rv">Future <strong>Vision</strong> &amp; Milestones</h2>
          <div className="divider rv" style={{ margin: '0 auto' }}></div>
        </div>
        
        <div className="goals-g" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3.5rem' }}>
          <div className="goal-card rv" style={{ background: 'rgba(7,17,31,0.72)', backdropFilter: 'blur(12px)', border: '1px solid var(--gb)', padding: '2.5rem', borderRadius: '4px' }}>
            <div className="goal-yr" style={{ fontSize: '3rem', color: 'var(--gold)', opacity: 0.2, fontWeight: 700, marginBottom: '0.5rem' }}>2025</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Digital Transformation</h3>
            <p style={{ lineHeight: 1.8, color: 'var(--slate)' }}>Launching our proprietary logistics management platform with AI-powered route optimization, real-time tracking, and automated customs documentation across all trade corridors.</p>
          </div>
          
          <div className="goal-card rv" style={{ background: 'rgba(7,17,31,0.72)', backdropFilter: 'blur(12px)', border: '1px solid var(--gb)', padding: '2.5rem', borderRadius: '4px' }}>
            <div className="goal-yr" style={{ fontSize: '3rem', color: 'var(--gold)', opacity: 0.2, fontWeight: 700, marginBottom: '0.5rem' }}>2026</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Global Hub Expansion</h3>
            <p style={{ lineHeight: 1.8, color: 'var(--slate)' }}>Establishing operational hubs in Dubai, Singapore, and Frankfurt to strengthen our aviation support and international trade capabilities in key global gateway markets.</p>
          </div>
          
          <div className="goal-card rv" style={{ background: 'rgba(7,17,31,0.72)', backdropFilter: 'blur(12px)', border: '1px solid var(--gb)', padding: '2.5rem', borderRadius: '4px' }}>
            <div className="goal-yr" style={{ fontSize: '3rem', color: 'var(--gold)', opacity: 0.2, fontWeight: 700, marginBottom: '0.5rem' }}>2027</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Sustainable Operations</h3>
            <p style={{ lineHeight: 1.8, color: 'var(--slate)' }}>Achieving carbon-neutral logistics operations through green fleet adoption, renewable energy partnerships, and sustainable packaging initiatives across all service lines.</p>
          </div>
          
          <div className="goal-card rv" style={{ background: 'rgba(7,17,31,0.72)', backdropFilter: 'blur(12px)', border: '1px solid var(--gb)', padding: '2.5rem', borderRadius: '4px' }}>
            <div className="goal-yr" style={{ fontSize: '3rem', color: 'var(--gold)', opacity: 0.2, fontWeight: 700, marginBottom: '0.5rem' }}>2028</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Industry Leadership</h3>
            <p style={{ lineHeight: 1.8, color: 'var(--slate)' }}>Becoming the recognized leader in integrated logistics and aviation support across South Asia and the GCC, managing a portfolio exceeding $500M in annual trade volume.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
