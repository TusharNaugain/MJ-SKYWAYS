export default function Leadership() {
  return (
    <section id="leadership" style={{ padding: '8rem 0', background: 'var(--navy)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="s-label rv" style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1rem' }}>The People Behind the Vision</p>
          <h2 className="s-title rv" style={{ fontFamily: 'var(--ff-display)', fontSize: '3rem', fontWeight: 300, color: '#fff' }}>Our <strong>Leadership</strong></h2>
          <div className="divider rv" style={{ margin: '0 auto', width: '60px', height: '2px', background: 'var(--gold)' }}></div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          <div className="team-card rv" style={{ background: '#0b162c', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '420px', width: '100%', backgroundColor: '#152540' }}>
               <img src="/images/services/jimmy.jpeg" alt="Jimmy Pious" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} />
            </div>
            <div style={{ padding: '2rem' }}>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: '0.8rem', fontWeight: 600 }}>Director</div>
              <h3 style={{ fontFamily: 'var(--ff-body)', fontSize: '1.4rem', fontWeight: 600, color: '#fff', marginBottom: '1.2rem' }}>Jimmy Pious</h3>
              <p style={{ color: 'var(--slate)', fontSize: '0.9rem', lineHeight: 1.6, margetBottom: 0 }}>Focused on business expansion, strategic relationships, and building a more premium global-facing client experience.</p>
            </div>
          </div>
          
          <div className="team-card rv" style={{ background: '#0b162c', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '420px', width: '100%', backgroundColor: '#152540' }}>
               <img src="/images/services/chinchu.jpeg" alt="Chinchu Varghese" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 5%' }} />
            </div>
            <div style={{ padding: '2rem' }}>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: '0.8rem', fontWeight: 600 }}>Director</div>
              <h3 style={{ fontFamily: 'var(--ff-body)', fontSize: '1.4rem', fontWeight: 600, color: '#fff', marginBottom: '1.2rem' }}>Chinchu Varghese</h3>
              <p style={{ color: 'var(--slate)', fontSize: '0.9rem', lineHeight: 1.6, margetBottom: 0 }}>Supports brand growth, client trust, and leadership visibility across the company presentation and stakeholder communication.</p>
            </div>
          </div>
          
          <div className="team-card rv" style={{ background: '#0b162c', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '420px', width: '100%', backgroundColor: '#152540' }}>
               <img src="/images/services/harishdhuthi.jpeg" alt="Harish Nair" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 5%' }} />
            </div>
            <div style={{ padding: '2rem' }}>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: '0.8rem', fontWeight: 600 }}>Director</div>
              <h3 style={{ fontFamily: 'var(--ff-body)', fontSize: '1.4rem', fontWeight: 600, color: '#fff', marginBottom: '1.2rem' }}>Harish Nair</h3>
              <p style={{ color: 'var(--slate)', fontSize: '0.9rem', lineHeight: 1.6, margetBottom: 0 }}>Brings operational discipline and execution focus to freight, movement planning, and commercial delivery standards.</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
