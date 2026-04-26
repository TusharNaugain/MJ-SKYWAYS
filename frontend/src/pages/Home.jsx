import Hero from '../components/Hero';
import PageCarousel from '../components/PageCarousel';

export default function Home() {
  const homeSlides = [
    {
      tag: 'Logistics',
      title: 'Global Supply Chain Mastery',
      description: 'Leveraging AI and end-to-end operational control, we guarantee rapid transit and minimal risk across global corridors.',
      action: 'Learn More',
      image: '/images/services/svc_logistics_1774798798720.png'
    },
    {
      tag: 'Aviation',
      title: 'Premium Aviation Support',
      description: 'Comprehensive ground handling, fueling, and crew logistics for chartered and commercial airlines worldwide.',
      action: 'Explore Services',
      image: '/images/why-us/feat_speed_1774797837247.png'
    },
    {
      tag: 'Trade',
      title: 'Strategic International Trade',
      description: 'Navigating complex borders with ease. We streamline compliance, logistics, and operational setup for seamless cross-border success.',
      action: 'Read Case Study',
      image: '/images/why-us/hero_why_us_1774797773833.png'
    }
  ];

  return (
    <>
      <Hero />
      <PageCarousel title="Our Expertise" slides={homeSlides} />
    </>
  );
}
