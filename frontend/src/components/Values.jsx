export default function Values() {
  return (
    <section id="values">
      <div className="container">
        <div className="center-head">
          <p className="s-label rv">What We Stand For</p>
          <h2 className="s-title rv">Our <strong>Core Values</strong></h2>
          <div className="divider rv"></div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          
          <div className="val-image-col rv" style={{ position: 'sticky', top: '100px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--gb)' }}>
            <img 
              src="/images/why-us/feat_tech_1774798067613.png" 
              alt="Core Values" 
              style={{ width: '100%', height: 'calc(100vh - 200px)', minHeight: '600px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="val-card rv" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
               <div className="val-icon" style={{ marginBottom: 0 }}>⚖️</div>
               <div><h3>Integrity</h3><p style={{marginBottom: 0}}>We conduct our business with honesty, transparency, and strong ethical standards in every relationship.</p></div>
            </div>
            
            <div className="val-card rv" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
               <div className="val-icon" style={{ marginBottom: 0 }}>🛡️</div>
               <div><h3>Reliability</h3><p style={{marginBottom: 0}}>We are committed to delivering consistent, dependable, and timely services that our customers can trust.</p></div>
            </div>
            
            <div className="val-card rv" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
               <div className="val-icon" style={{ marginBottom: 0 }}>🤝</div>
               <div><h3>Customer Commitment</h3><p style={{marginBottom: 0}}>Our customers are at the center of everything we do, and we strive to exceed their expectations.</p></div>
            </div>
            
            <div className="val-card rv" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
               <div className="val-icon" style={{ marginBottom: 0 }}>💡</div>
               <div><h3>Innovation</h3><p style={{marginBottom: 0}}>We continuously improve our processes and adopt modern technologies to provide smarter logistics solutions.</p></div>
            </div>
            
            <div className="val-card rv" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
               <div className="val-icon" style={{ marginBottom: 0 }}>🌐</div>
               <div><h3>Global Excellence</h3><p style={{marginBottom: 0}}>We aim to meet international standards in quality, efficiency, and service delivery.</p></div>
            </div>
            
            <div className="val-card rv" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
               <div className="val-icon" style={{ marginBottom: 0 }}>🧑‍🤝‍🧑</div>
               <div><h3>Teamwork</h3><p style={{marginBottom: 0}}>We believe strong collaboration and respect among our people drive success and growth.</p></div>
            </div>
            
            <div className="val-card rv" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
               <div className="val-icon" style={{ flexShrink: 0, marginBottom: 0 }}>🌿</div>
               <div><h3>Sustainability</h3><p style={{marginBottom: 0}}>We operate responsibly, focusing on long-term growth that benefits society, the environment, and our stakeholders.</p></div>
            </div>
          </div>
          
        </div>

        <style>{`
          @media(max-width: 900px) {
            #values > .container > div:nth-child(2) {
              grid-template-columns: 1fr !important;
            }
            .val-image-col {
              position: static !important;
              height: 400px;
            }
            .val-image-col img {
              height: 400px !important;
              min-height: auto !important;
            }
          }
        `}</style>

      </div>
    </section>
  );
}
