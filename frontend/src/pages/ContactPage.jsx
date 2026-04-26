import Contact from '../components/Contact';

export default function ContactPage({ showToast }) {
  return (
    <>
      <section 
        className="page-hero" 
        style={{
          position: 'relative',
          padding: '12rem 0 8rem',
          background: 'url(/images/why-us/feat_reliability_1774797882586.png) center/cover no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(7,17,31,0.6), var(--navy))', zIndex: 1 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <p className="s-label rv vis" style={{ animation: 'fuv 0.8s 0.2s forwards', opacity: 0 }}>Reach Out Today</p>
          <h1 className="hero-h" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1.2rem', animation: 'fuv 0.9s 0.4s forwards', opacity: 0 }}>
            Get in <em>Touch</em>
          </h1>
          <p className="hero-sub rv vis" style={{ animation: 'fuv 1s 0.6s forwards', opacity: 0, margin: '0 auto' }}>
            Our global team is available 24/7 to provide seamless solutions to your most complex operational challenges. Connect with us.
          </p>
        </div>
      </section>

      <Contact showToast={showToast} />
    </>
  );
}
