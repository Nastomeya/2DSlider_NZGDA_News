import React, { useEffect, useState, useRef } from "react";
import CardCarousel from "./CardCarousel";
import DotCarousel from "./DotCarousel";
import SliderArrows from "./SliderArrows";
import CarouselText from "./CarouselText";
import Gamepad from "./Gamepad";
import { mod } from "./mod";

const AUTOPLAY_DELAY = 5500; // ms
const RESUME_DELAY = 1000; // ms

export default function CarouselContainer({
  datas,
  isAutoPlaying = true,
  isMobile = false,
}) {
  const N = datas?.length ?? 0;
  const [currentIndex, setCurrentIndex] = useState(Math.floor(N / 2) || 0);
  const [autoPlayActive, setAutoPlayActive] = useState(isAutoPlaying);

  // TIMER REFS (so we can clear safely)
  const autoplayTimeoutRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  // Keep autoplay flag in sync with prop
  useEffect(() => setAutoPlayActive(isAutoPlaying), [isAutoPlaying]);

  // Auto-advance
  useEffect(() => {
    // Clear any previous timer
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }

    if (!autoPlayActive || N === 0) return;

    autoplayTimeoutRef.current = setTimeout(() => {
      setCurrentIndex((i) => mod(i + 1, N));
    }, AUTOPLAY_DELAY);

    // Cleanup on deps change/unmount
    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
        autoplayTimeoutRef.current = null;
      }
    };
  }, [autoPlayActive, N, currentIndex]); // ← currentIndex resets the timer after clicks

  // When user clicks card/dot/arrow: set index and pause briefly
  const handleSelectIndex = (idx) => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }

    setCurrentIndex(mod(idx, N));
    setAutoPlayActive(false);

    // Resume after a short delay; the autoplay effect above
    // will start a fresh AUTOPLAY_DELAY timer after resume.
    resumeTimeoutRef.current = setTimeout(() => {
      setAutoPlayActive(true);
    }, RESUME_DELAY);
  };

  // Clear timers if the component unmounts
  useEffect(() => {
    return () => {
      if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  if (N === 0) return null;

  // --- Responsive sizes ---
  // const containerWidth = Math.min(
  //   typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.95, 1200) : 1200,
  //   1200
  // );
  // const cardWidth = containerWidth * (isMobile ? 0.7 : 0.18); // scale
  // const gap = cardWidth * 0.25;  // 5% of card width

  // const dotSize = Math.max(Math.min(cardWidth * 0.04, 30), 20); // min 8px, max 20px
  // const dotSpacing = dotSize * 2;

  // const arrowSize = Math.max(Math.min(cardWidth * 0.1, 70), 60);
  // const arrowOffsetX = cardWidth + (isMobile ? 50 : 350); // adjust relative to card width
  // const dotOffsetY = 75;
  // const arrowOffsetY = 45;

  const dotSize = isMobile ? 20 : 30;
  const dotSpacing = dotSize * 2;
  const arrowSize = isMobile ? 60 : 70;
  const arrowOffsetX = isMobile ? 50 : 350;
  const dotOffsetY = 75;
  const arrowOffsetY = 45;

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", minHeight: "300px" }}>
        {/* <CarouselText /> */}

        <CardCarousel
          datas={datas}
          cardClickedIndex={currentIndex}
          onCardClick={handleSelectIndex}
          isMobile={isMobile}
          style={{ zIndex: 2, }}
        />
      </div>

      <div style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <DotCarousel
          datas={datas}
          cardClickedIndex={currentIndex}
          onDotClick={handleSelectIndex}
          offsetY={dotOffsetY}        // px from bottom of the dots container
          space={dotSpacing}    // Try increasing this to see spacing change
          dotSize={dotSize}
          style={{ zIndex: 1 }}
        />

        <SliderArrows
          currentIndex={currentIndex}
          onBtnClick={handleSelectIndex}
          totalSlides={N}
          offsetX={arrowOffsetX} // push the pair sideways if you want
          offsetY={arrowOffsetY}
          size={arrowSize}
          style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 1 }}
        />
      </div>
      {/* Decorative gamepads (2D version) */}
      <Gamepad color="#3F4D6B" width={0.2} height={0.2} position={[0.3, 100]} rotation={45} />
      <Gamepad color="#bababaff" width={0.28} height={0.28} position={[0.1, 120]} rotation={-26} />
    </div >
  );
}
