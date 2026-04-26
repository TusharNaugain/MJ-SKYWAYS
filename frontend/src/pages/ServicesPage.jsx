import Services from '../components/Services';
import PageCarousel from '../components/PageCarousel';

export default function ServicesPage() {
  const caseSlides = [
    {
      tag: 'Case Study: Aviation',
      title: 'AOG Recovery in Record Time',
      description: 'How we coordinated parts delivery, maintenance, and crew setup for a grounded 787 in under 12 hours globally.',
      image: '/images/why-us/feat_speed_1774797837247.png'
    },
    {
      tag: 'Case Study: Trade',
      title: 'Navigating New Borders',
      description: 'Facilitating a full end-to-end supply chain setup for a heavy machinery provider spanning Europe to Southeast Asia.',
      image: '/images/services/svc_logistics_1774798798720.png'
    },
    {
      tag: 'Case Study: PSU',
      title: 'Government Efficiency',
      description: 'Deploying secure, compliant, and hyper-efficient logistics for large scale public sector projects under tight deadlines.',
      image: '/images/why-us/feat_reliability_1774797882586.png'
    }
  ];

  return (
    <>
      <section 
        className="page-hero" 
        style={{
          position: 'relative',
          padding: '12rem 0 8rem',
          background: 'url(/images/services/svc_logistics_1774798798720.png) center/cover no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(7,17,31,0.6), var(--navy))', zIndex: 1 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <p className="s-label rv vis" style={{ animation: 'fuv 0.8s 0.2s forwards', opacity: 0 }}>End-to-End Solutions</p>
          <h1 className="hero-h" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1.2rem', animation: 'fuv 0.9s 0.4s forwards', opacity: 0 }}>
            Our <em>Services</em>
          </h1>
          <p className="hero-sub rv vis" style={{ animation: 'fuv 1s 0.6s forwards', opacity: 0, margin: '0 auto' }}>
            Comprehensive logistics, aviation, and hospitality support tailored to scale your global operations seamlessly.
          </p>
        </div>
      </section>

      <Services />
      <PageCarousel title="Proven Success" slides={caseSlides} />
    </>
  );
}
