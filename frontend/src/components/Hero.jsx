import { useEffect } from 'react';

export default function Hero() {
  useEffect(() => {
    // Number counting effect
    const stats = document.querySelectorAll('.stat-n');
    setTimeout(() => {
      stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const suffix = stat.getAttribute('data-suffix') || '';
        const raw = stat.getAttribute('data-raw');
        
        if (raw) {
          stat.innerText = raw;
          return;
        }

        const duration = 2000;
        const start = performance.now();
        
        const countFn = (time) => {
          const progress = Math.min((time - start) / duration, 1);
          const current = Math.floor(progress * target);
          stat.innerText = current + suffix;
          if (progress < 1) requestAnimationFrame(countFn);
        };
        requestAnimationFrame(countFn);
      });
    }, 1500);
  }, []);

  return (
    <section 
      id="hero" 
      style={{
        position: 'relative',
        background: 'url(/images/why-us/feat_speed_1774797837247.png) center/cover no-repeat fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="hero-ov" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(7,17,31,0.9), transparent 80%), linear-gradient(to bottom, transparent, var(--navy))', zIndex: 1 }}></div>
      <div className="hero-c" style={{ position: 'relative', zIndex: 2 }}>
        <p className="hero-eyebrow">Global · Reliable · Innovative</p>
        <h1 className="hero-h">Connecting <em>Worlds</em><br/>Through Excellence</h1>
        <p className="hero-sub">M Jayalakshmi Skyway delivers end-to-end solutions across logistics, aviation, hospitality and international trade — bridging continents with precision and trust.</p>
        <div className="hero-btns">
          <a href="#services" className="btn-p">Explore Services</a>
          <a href="#contact" className="btn-o">Get in Touch</a>
        </div>
      </div>
      <div className="hero-stats" style={{ position: 'relative', zIndex: 2 }}>
        <div><div className="stat-n" data-target="5">0</div><div className="stat-l">Industries</div></div>
        <div><div className="stat-n" data-target="30" data-suffix="+">0</div><div className="stat-l">Countries</div></div>
        <div><div className="stat-n" data-target="100" data-suffix="%">0</div><div className="stat-l">Client Focus</div></div>
        <div><div className="stat-n" data-raw="24/7">24/7</div><div className="stat-l">Operations</div></div>
      </div>
      <div className="scroll-ind" style={{ position: 'relative', zIndex: 2 }}><div className="scroll-line"></div></div>
    </section>
  );
}
