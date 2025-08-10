import React, { useMemo } from "react";
import CardSlider from "./CardSlider";

export default function CardSliderDemo() {
  // Demo data — replace with your real items
  const items = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `Card ${i + 1}`,
        subtitle: `Subtitle ${i + 1}`,
        color: `hsl(${(i * 35) % 360} 70% 55%)`,
      })),
    []
  );

  return (
    <div className="page">
      <h1>Card Slider</h1>
      <p className="muted">
        Drag / swipe, use mouse wheel (shift+wheel on some trackpads), or click arrows.
      </p>
      <CardSlider
        items={items}
        // How many cards roughly visible at once on desktop?
        approxCardsPerView={3}
        ariaLabel="Featured cards"
        onCardClick={(item) => console.log('Clicked:', item)}
      />
    </div>
  );
}