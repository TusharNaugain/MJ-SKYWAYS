import { useEffect } from 'react';

export default function About() {
  return (
    <>
      <section id="about">
        <div className="container">
          <div className="about-g">
            <div className="rv about-media-pane" style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', border: '1px solid var(--gb)', minHeight: '400px' }}>
              <img 
                src="/images/why-us/feat_network_1774798016753.png" 
                alt="Global Headquarters" 
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <div>
              <p className="s-label rv">About MJ Skyways</p>
              <h2 className="s-title rv"><strong>Built on Trust.</strong><br/>Driven by Innovation.</h2>
              <div className="divider rv"></div>
              <div className="vm-cards">
                <div className="vm-card rv">
                  <div className="vm-badge">Our Vision</div>
                  <h3>Global Leadership</h3>
                  <p>To become a globally trusted leader in logistics, aviation support, hospitality and PSU as well as international trade by connecting businesses across borders with speed, reliability, and innovation.</p>
                </div>
                <div className="vm-card rv">
                  <div className="vm-badge">Our Mission</div>
                  <h3>Operational Excellence</h3>
                  <p>Our mission is to deliver efficient, secure, and customer-focused solutions that empower businesses seamlessly across the world while maintaining the highest standards of professionalism, integrity, and operational excellence.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
