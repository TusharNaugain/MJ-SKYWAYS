import { useEffect, useRef } from 'react';

export default function Cursor() {
  const curRef = useRef(null);
  const curRRef = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    
    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (curRef.current) {
        curRef.current.style.left = mx + 'px';
        curRef.current.style.top = my + 'px';
      }
    };
    
    let animationFrameId;
    const animR = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (curRRef.current) {
        curRRef.current.style.left = rx + 'px';
        curRRef.current.style.top = ry + 'px';
      }
      animationFrameId = requestAnimationFrame(animR);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animR();

    // Hover effect
    const handleMouseEnter = () => {
      if(curRef.current) { curRef.current.style.width = '18px'; curRef.current.style.height = '18px'; }
      if(curRRef.current) { curRRef.current.style.width = '50px'; curRRef.current.style.height = '50px'; }
    };
    const handleMouseLeave = () => {
      if(curRef.current) { curRef.current.style.width = '10px'; curRef.current.style.height = '10px'; }
      if(curRRef.current) { curRRef.current.style.width = '34px'; curRRef.current.style.height = '34px'; }
    };

    const setupSelectors = () => {
      document.querySelectorAll('a, button, .val-card, .svc-card, .team-card, .why-item').forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };
    
    // Add a small delay robustly apply hover effects on initial renders
    setTimeout(setupSelectors, 500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      document.querySelectorAll('a, button, .val-card, .svc-card, .team-card, .why-item').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="cur" ref={curRef}></div>
      <div id="cur-r" ref={curRRef}></div>
    </>
  );
}
