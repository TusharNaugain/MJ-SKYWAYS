export default function Services() {
  const coreServices = [
    {
      num: '01 / 05',
      title: 'Logistics',
      img: '/images/services/svc_logistics_1774798798720.png',
      desc: 'End-to-end supply chain management and freight solutions — from warehousing and last-mile delivery to customs clearance and multimodal transport across global corridors.'
    },
    {
      num: '02 / 05',
      title: 'Aviation Support',
      img: '/images/why-us/feat_speed_1774797837247.png', // The stunning cargo plane image
      desc: 'Comprehensive ground handling, aviation fuel procurement, aircraft maintenance coordination, and crew logistics support for commercial and charter airline operations worldwide.'
    },
    {
      num: '03 / 05',
      title: 'Hospitality',
      img: '/images/why-us/feat_reliability_1774797882586.png', // Glowing warehouse -> looks premium
      desc: 'Premium hospitality management and consulting including hotel operations, event management, catering coordination, and end-to-end travel logistics for corporate clients.'
    },
    {
      num: '04 / 05',
      title: 'PSU Services',
      img: '/images/why-us/feat_network_1774798016753.png', // Operations control center map
      desc: 'Specialized procurement, supply chain, and operational support services tailored for Public Sector Undertakings — ensuring compliance, efficiency, and cost-effective delivery.'
    },
    {
      num: '05 / 05',
      title: 'International Trade',
      img: '/images/why-us/hero_why_us_1774797773833.png', // Shipping boat map
      desc: 'Strategic import/export facilitation, trade finance advisory, regulatory compliance, and market entry support for businesses expanding across international borders.'
    }
  ];

  return (
    <section id="services">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="s-label rv">What We Offer</p>
          <h2 className="s-title rv">Our <strong>Core Services</strong></h2>
          <div className="divider rv" style={{ margin: '0 auto' }}></div>
        </div>
        
        <div className="svc-g" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {coreServices.map((svc, i) => (
            <div key={i} className="svc-card rv" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '220px', width: '100%', position: 'relative' }}>
                <img src={svc.img} alt={svc.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--navy-mid), transparent 60%)' }}></div>
              </div>
              <div style={{ padding: '2.2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="svc-num" style={{ marginBottom: '1rem' }}>{svc.num}</div>
                <h3 style={{ margin: '0 0 1rem 0' }}>{svc.title}</h3>
                <p style={{ margin: '0 0 1.5rem 0', flex: 1 }}>{svc.desc}</p>
                <a href="#contact" className="svc-link" style={{ marginTop: 'auto' }}>Inquire Now →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
