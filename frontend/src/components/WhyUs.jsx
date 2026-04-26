export default function WhyUs() {
  return (
    <section id="why">
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <p className="s-label rv">Why MJ Skyways</p>
        <h2 className="s-title rv">The <strong>Difference</strong><br/>is in the Detail</h2>
        <div className="divider rv" style={{ margin: '0 auto 3.5rem' }}></div>
        
        <div className="why-items" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', textAlign: 'left' }}>
          <div className="why-item rv" style={{ padding: '1.2rem', background: 'var(--glass)', border: '1px solid var(--gb)', borderRadius: '4px', display: 'flex', gap: '1.6rem', alignItems: 'center' }}>
            <div style={{width: '120px', height: '120px', flexShrink: 0, borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--gb)'}}>
              <img src="/images/why-us/feat_speed_1774797837247.png" alt="Speed" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
            </div>
            <div>
              <div style={{display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem'}}>
                <div className="why-n" style={{fontSize: '2.2rem', minWidth: 'auto', margin: 0}}>01</div>
                <h3 style={{margin: 0}}>Speed &amp; Agility</h3>
              </div>
              <p style={{margin: 0}}>Streamlined operations and global partnerships ensure rapid response times, real-time tracking, and on-time delivery across all verticals — every time.</p>
            </div>
          </div>

          <div className="why-item rv" style={{ padding: '1.2rem', background: 'var(--glass)', border: '1px solid var(--gb)', borderRadius: '4px', display: 'flex', gap: '1.6rem', alignItems: 'center' }}>
            <div style={{width: '120px', height: '120px', flexShrink: 0, borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--gb)'}}>
              <img src="/images/why-us/feat_reliability_1774797882586.png" alt="Reliability" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
            </div>
            <div>
              <div style={{display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem'}}>
                <div className="why-n" style={{fontSize: '2.2rem', minWidth: 'auto', margin: 0}}>02</div>
                <h3 style={{margin: 0}}>Proven Reliability</h3>
              </div>
              <p style={{margin: 0}}>Built on operational excellence — consistent, dependable results backed by rigorous quality standards and transparent communication at every step.</p>
            </div>
          </div>

          <div className="why-item rv" style={{ padding: '1.2rem', background: 'var(--glass)', border: '1px solid var(--gb)', borderRadius: '4px', display: 'flex', gap: '1.6rem', alignItems: 'center' }}>
            <div style={{width: '120px', height: '120px', flexShrink: 0, borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--gb)'}}>
              <img src="/images/why-us/feat_network_1774798016753.png" alt="Network" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
            </div>
            <div>
              <div style={{display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem'}}>
                <div className="why-n" style={{fontSize: '2.2rem', minWidth: 'auto', margin: 0}}>03</div>
                <h3 style={{margin: 0}}>Global Network</h3>
              </div>
              <p style={{margin: 0}}>Our network spans 30+ countries across Asia, Europe, the Middle East and beyond — giving your business a truly worldwide reach with local expertise.</p>
            </div>
          </div>

          <div className="why-item rv" style={{ padding: '1.2rem', background: 'var(--glass)', border: '1px solid var(--gb)', borderRadius: '4px', display: 'flex', gap: '1.6rem', alignItems: 'center' }}>
            <div style={{width: '120px', height: '120px', flexShrink: 0, borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--gb)'}}>
              <img src="/images/why-us/feat_tech_1774798067613.png" alt="Tech Driven" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
            </div>
            <div>
              <div style={{display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem'}}>
                <div className="why-n" style={{fontSize: '2.2rem', minWidth: 'auto', margin: 0}}>04</div>
                <h3 style={{margin: 0}}>Technology-Driven</h3>
              </div>
              <p style={{margin: 0}}>From AI-powered logistics management to real-time cargo visibility platforms, we leverage cutting-edge technology to deliver smarter, faster solutions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
