import React, { useEffect, useState } from "react";
import CardCarousel from "./CardCarousel";
import DotCarousel from "./DotCarousel";
import SliderArrows from "./SliderArrows";
import CarouselText from "./CarouselText";
import Gamepad from "./Gamepad";
import { mod } from "./mod";

const AUTOPLAY_DELAY = 6500; // ms
const RESUME_DELAY = 1000; // ms

export default function CarouselContainer({
  datas,
  isAutoPlaying = true,
  isMobile = false,
}) {
  const N = datas?.length ?? 0;
  const [currentIndex, setCurrentIndex] = useState(Math.floor(N / 2) || 0);
  const [autoPlayActive, setAutoPlayActive] = useState(isAutoPlaying);

  // Keep autoplay flag in sync with prop
  useEffect(() => setAutoPlayActive(isAutoPlaying), [isAutoPlaying]);

  // Auto-advance
  useEffect(() => {
    if (!autoPlayActive || N === 0) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => mod(i + 1, N));
    }, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, [autoPlayActive, N]);

  // When user clicks card/dot/arrow: set index and pause briefly
  const handleSelectIndex = (idx) => {
    setCurrentIndex(mod(idx, N));
    setAutoPlayActive(false);
    const id = setTimeout(() => setAutoPlayActive(true), RESUME_DELAY);
    // Optional: clean-up if parent unmounts quickly
    return () => clearTimeout(id);
  };

  if (N === 0) return null;

  return (
    <div style={{ position: "relative", width: "100%", margin: "0 auto", overflow: "hidden" }}>
      {/* Title above */}
      <CarouselText />

      {/* Cards: pure 2D flat slider w/ looping */}
      <div style={{
        marginTop: 24,
        marginBottom: 16,
        display: "flex",
        justifyContent: "center", // Center the carousel
        alignItems: "center",
        width: "100%",
        overflow: "visible", // Changed to visible for debugging
      }}>
        <CardCarousel
          datas={datas}
          currentIndex={currentIndex}
          onCardClick={handleSelectIndex}
          visibleCount={isMobile ? 3 : 5} // Reduced visible count for better fit
          isMobile={isMobile}
          cardWidth={isMobile ? 300 : 420}
          gap={isMobile ? 35 : 60}

          style={{
            zIndex: 2, // this is the correct syntax
            background: "transparent",
            position: "relative",
          }}
        />
      </div>
      {/* Dots & arrows (2D versions you already have) */}
      <DotCarousel
        datas={datas}
        cardClickedIndex={currentIndex}
        onDotClick={handleSelectIndex}
        offsetY={20}        // px from bottom of the dots container
      />

      <SliderArrows
        currentIndex={currentIndex}
        onBtnClick={handleSelectIndex}
        totalSlides={N}
        offsetX={isMobile ? 120 : 0} // push the pair sideways if you want
        offsetY={24}
      />

      {/* Decorative gamepads (2D version) */}
      <Gamepad color="#3F4D6B" width={360} height={225} position={[60, -520]} rotation={45} />
      <Gamepad color="gray" width={360} height={360} position={[240, -520]} rotation={-26}
        style={{
          zIndex: 0, // this is the correct syntax
        }}
      />
    </div>
  );
}
