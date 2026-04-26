import About from '../components/About';
import Values from '../components/Values';
import Leadership from '../components/Leadership';
import PageCarousel from '../components/PageCarousel';

export default function AboutUs() {
  const aboutSlides = [
    {
      tag: 'History',
      title: 'Established in Excellence',
      description: 'Founded with a vision to streamline multi-continental logistics, our legacy is built on unyielding integrity and trust.',
      image: '/images/why-us/feat_reliability_1774797882586.png'
    },
    {
      tag: 'Culture',
      title: 'Our Global Team',
      description: 'A diverse, multinational workforce spanning 30+ countries, united by a passion for operational excellence and customer success.',
      image: '/images/why-us/feat_network_1774798016753.png'
    },
    {
      tag: 'Sustainability',
      title: 'Green Logistics',
      description: 'We are committed to aggressive carbon-neutral goals, heavily investing in sustainable packaging, fuel efficiency, and eco-partnerships.',
      image: '/images/why-us/feat_tech_1774798067613.png'
    }
  ];

  return (
    <>
      <section 
        className="page-hero" 
        style={{
          position: 'relative',
          padding: '12rem 0 8rem',
          background: 'url(/images/why-us/feat_network_1774798016753.png) center/cover no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(7,17,31,0.6), var(--navy))', zIndex: 1 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <p className="s-label rv vis" style={{ animation: 'fuv 0.8s 0.2s forwards', opacity: 0 }}>Discover Who We Are</p>
          <h1 className="hero-h" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1.2rem', animation: 'fuv 0.9s 0.4s forwards', opacity: 0 }}>
            About <em>M Jayalakshmi Skyway</em>
          </h1>
          <p className="hero-sub rv vis" style={{ animation: 'fuv 1s 0.6s forwards', opacity: 0, margin: '0 auto' }}>
            Built on trust and driven by an uncompromising vision for operational excellence. We bridge global markets with precision and integrity.
          </p>
        </div>
      </section>

      <About />
      <Values />
      <PageCarousel title="The Legacy" slides={aboutSlides} />
      <Leadership />
    </>
  );
}
