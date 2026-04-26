import WhyUs from '../components/WhyUs';
import Network from '../components/Network';
import Future from '../components/Future';
import PageCarousel from '../components/PageCarousel';

export default function WhyUsPage() {
  const testimonials = [
    {
      tag: 'TRADE',
      title: 'Strategic International Trade',
      description: 'Navigating complex borders with ease. We streamline compliance, logistics, and operational setup for seamless cross-border success.',
      action: 'READ CASE STUDY',
      image: '/images/why-us/hero_why_us_1774797773833.png' // Using the beautiful cargo ship image here
    },
    {
      tag: 'LOGISTICS',
      title: 'Global Freight & Supply Chain',
      description: 'MJ Skyways has entirely leveled up our supply chain strategy. Their team is accessible 24/7 and solves complex logistical problems before they impact operations.',
      action: 'READ CASE STUDY',
      image: '/images/services/svc_logistics_1774798798720.png'
    },
    {
      tag: 'AVIATION',
      title: 'Advanced Aviation Support',
      description: 'From central Asia to Europe, their operational capabilities are flawless. We witnessed a 35% reduction in compliance delays right off the bat.',
      action: 'READ CASE STUDY',
      image: '/images/why-us/feat_speed_1774797837247.png'
    }
  ];

  return (
    <>
      <section 
        className="page-hero" 
        style={{
          position: 'relative',
          padding: '12rem 0 8rem',
          background: 'url(/images/why-us/hero_why_us_1774797773833.png) center/cover no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(7,17,31,0.6), var(--navy))', zIndex: 1 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <p className="s-label rv vis" style={{ animation: 'fuv 0.8s 0.2s forwards', opacity: 0 }}>The MJ Skyways Difference</p>
          <h1 className="hero-h" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1.2rem', animation: 'fuv 0.9s 0.4s forwards', opacity: 0 }}>
            Why Choose <em>MJ Skyways</em>
          </h1>
          <p className="hero-sub rv vis" style={{ animation: 'fuv 1s 0.6s forwards', opacity: 0, margin: '0 auto' }}>
            A proven track record of delivering speed, reliability, and innovation across global markets. 
            Discover the unmatched advantages of partnering with us.
          </p>
        </div>
      </section>

      <WhyUs />
      
      {/* Testimonial slider / Carousel improved context */}
      <PageCarousel title="Testimonials" slides={testimonials} />
      
      <Network />
      <Future />
    </>
  );
}
