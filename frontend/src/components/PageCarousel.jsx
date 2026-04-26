import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Premium Auto-playing Swiper component with animated visuals
export default function PageCarousel({ slides = [] }) {
  if (!slides || slides.length === 0) return null;

  return (
    <section className="carousel-section" style={{ padding: '8rem 0', background: 'var(--navy)', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <Swiper
          modules={[Pagination, EffectFade, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          className="premiumSwiper rv"
          style={{ 
            background: '#0a1426', 
            borderRadius: '4px',
            border: '1px solid rgba(255,255,255,0.05)',
            minHeight: '400px',
            overflow: 'hidden'
          }}
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '400px' }}>
                
                {/* Left Side: Content */}
                <div style={{ padding: '4rem 6rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem', fontWeight: 600 }}>
                    {slide.tag || "HIGHLIGHT"}
                  </div>
                  <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '2.5rem', fontWeight: 400, color: '#fff', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                    {slide.title || "Excellence in Motion"}
                  </h3>
                  <p style={{ color: 'var(--slate)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                    {slide.description || "Delivering uncompromising quality and speed across all operational verticals."}
                  </p>
                  
                  {slide.action && (
                    <button style={{ 
                      alignSelf: 'flex-start',
                      padding: '1rem 2rem',
                      background: 'transparent',
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.2)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'border-color 0.3s'
                    }} onMouseOver={e=>e.target.style.borderColor='var(--gold)'} onMouseOut={e=>e.target.style.borderColor='rgba(255,255,255,0.2)'}>
                      {slide.action}
                    </button>
                  )}
                </div>

                {/* Right Side: Animated Visual or Image */}
                <div style={{ position: 'relative', background: '#0a1426', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {slide.image ? (
                     <img src={slide.image} alt={slide.title} className="carousel-img-anim" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                  ) : (
                    // Animated Node Graphic
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                      <div className="anim-node" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)' }}></div>
                      </div>
                      <div className="anim-node node-secondary" style={{ top: '25%', left: '30%', transform: 'translate(-50%, -50%)', width: '40px', height: '40px', animationDelay: '1s' }}>
                         <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', opacity: 0.6 }}></div>
                      </div>
                      <div className="anim-node node-tertiary" style={{ top: '75%', left: '70%', transform: 'translate(-50%, -50%)', width: '30px', height: '30px', animationDelay: '2s' }}>
                         <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--gold)', opacity: 0.4 }}></div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        /* Removed navigation styles */
        .premiumSwiper .swiper-pagination-bullet {
          background: #3b82f6;
          opacity: 0.3;
          transition: all 0.3s;
        }
        .premiumSwiper .swiper-pagination-bullet-active {
          background: #3b82f6; /* Blue active dot */
          opacity: 1;
        }
        .premiumSwiper .swiper-pagination {
          text-align: left;
          padding-left: 6rem;
          bottom: 2rem !important;
        }

        /* Image Pan Animation */
        .carousel-img-anim {
          animation: slowPan 15s infinite alternate ease-in-out;
          transform-origin: center;
        }
        @keyframes slowPan {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }

        /* Animated Nodes */
        .anim-node {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(201, 169, 110, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulseNode 3s infinite alternate ease-in-out;
        }
        @keyframes pulseNode {
          0% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 0 rgba(201,169,110,0); }
          100% { transform: translate(-50%, -50%) scale(1.15); box-shadow: 0 0 20px rgba(201,169,110,0.1); border-color: rgba(201,169,110,0.4); }
        }
        
        @media(max-width: 900px) {
           .premiumSwiper > .swiper-wrapper > .swiper-slide > div {
             grid-template-columns: 1fr !important;
           }
           .premiumSwiper .swiper-pagination {
             padding-left: 2rem;
           }
           .premiumSwiper .swiper-slide > div > div:first-child {
             padding: 4rem 2rem !important;
             border-right: none !important;
           }
           .premiumSwiper .swiper-slide > div > div:last-child {
             display: none !important; /* hide graphic on mobile */
           }
        }
      `}</style>
    </section>
  );
}
