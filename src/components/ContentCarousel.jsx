import { Children, useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ContentCarousel({ children, label, tone = 'light', className = '', fitContent = false }) {
  const viewportRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const slides = Children.toArray(children);
  const fitClass = fitContent ? `home-carousel-fit-${Math.min(slides.length, 4)}` : '';

  const updateControls = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const overflow = viewport.scrollWidth - viewport.clientWidth > 2;
    setHasOverflow(overflow);
  }, []);

  useEffect(() => {
    updateControls();
    window.addEventListener('resize', updateControls);
    const observer = new ResizeObserver(updateControls);
    if (viewportRef.current) observer.observe(viewportRef.current);

    return () => {
      window.removeEventListener('resize', updateControls);
      observer.disconnect();
    };
  }, [updateControls]);

  const move = (direction) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    const atStart = viewport.scrollLeft <= 2;
    const atEnd = viewport.scrollLeft >= maxScroll - 2;
    const track = viewport.querySelector('.home-carousel-track');
    const firstSlide = track?.querySelector('.home-carousel-slide');
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const slideStep = (firstSlide?.getBoundingClientRect().width || viewport.clientWidth) + gap;
    const nextScroll = direction > 0
      ? (atEnd ? 0 : Math.min(maxScroll, viewport.scrollLeft + slideStep))
      : (atStart ? maxScroll : Math.max(0, viewport.scrollLeft - slideStep));

    viewport.scrollTo({
      left: nextScroll,
      behavior: reduceMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <div className={`home-carousel home-carousel-${tone} ${fitClass} ${className}`}>
      <button
        type="button"
        className="home-carousel-control home-carousel-control-prev"
        onClick={() => move(-1)}
        disabled={!hasOverflow}
        aria-label={`Show previous ${label}`}
      >
        <ChevronLeft size={22} aria-hidden="true" />
      </button>
      <div
        ref={viewportRef}
        className="home-carousel-viewport"
        role="region"
        aria-label={label}
        tabIndex="0"
        onScroll={updateControls}
      >
        <div className="home-carousel-track">
          {slides.map((child, index) => (
            <div key={child.key ?? index} className="home-carousel-slide">{child}</div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="home-carousel-control home-carousel-control-next"
        onClick={() => move(1)}
        disabled={!hasOverflow}
        aria-label={`Show next ${label}`}
      >
        <ChevronRight size={22} aria-hidden="true" />
      </button>
    </div>
  );
}
