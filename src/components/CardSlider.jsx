import React, { useRef, useCallback } from 'react';
// If you don't want animations, delete this import and the <motion.*> usages
import { motion } from 'framer-motion';
import './CardSlider.css';

export default function CardSlider({
  items,
  approxCardsPerView = 3,
  ariaLabel = 'Horizontal card slider',
  onCardClick,
}) {
  const scrollerRef = useRef(null);
  const cardRef = useRef(null);

  // Figure out how far to scroll per "next/prev" click
  const scrollStepPx = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return 0;
    // Try card width; fallback to container width / approxCardsPerView
    const cardW = cardRef.current?.offsetWidth;
    const gap = parseFloat(getComputedStyle(scroller).columnGap || getComputedStyle(scroller).gap || 16);
    return (cardW || scroller.clientWidth / approxCardsPerView) + gap;
  }, [approxCardsPerView]);

  const scrollByDir = (dir = 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollBy({ left: dir * scrollStepPx(), behavior: 'smooth' });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollByDir(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollByDir(-1);
    }
  };

  return (
    <section className="slider-wrap" aria-label={ariaLabel}>
      <button
        type="button"
        className="nav-btn prev"
        aria-label="Previous"
        onClick={() => scrollByDir(-1)}
      >
        ‹
      </button>

      <div
        ref={scrollerRef}
        className="slider"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="list"
        aria-roledescription="slide list"
      >
        {items.map((item, i) => {
          const CardTag = motion ? motion.article : 'article'; // Safe if you removed Framer
          return (
            <CardTag
              // If you removed Framer, replace 'CardTag' with 'article' and delete 'whileHover' and 'whileTap'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={item.id}
              ref={i === 0 ? cardRef : undefined}
              className="card"
              role="listitem"
              style={{ background: item.color }}
              onClick={() => onCardClick?.(item)}
            >
              <div className="card-body">
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
                <button
                  className="card-cta"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCardClick?.(item);
                  }}
                >
                  View
                </button>
              </div>
            </CardTag>
          );
        })}
      </div>

      <button
        type="button"
        className="nav-btn next"
        aria-label="Next"
        onClick={() => scrollByDir(1)}
      >
        ›
      </button>
    </section>
  );
}
