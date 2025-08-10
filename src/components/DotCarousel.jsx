import React, { useRef } from "react";
import Dot from "./Dot"; // the 2D Dot that takes { index, currentIndex, getButtonsStyle, ... }
import { useButtonsPosition } from "./useButtonsPosition";

const DOTS = {
  dotSize: 12,   // px diameter of each dot
  space: 18,     // px center-to-center gap between dots
};

export default function DotCarousel({
  datas,
  onDotClick,
  cardClickedIndex,
  offsetY = 20,  // px from bottom of the container
  style = {},
}) {
  const totalCount = Array.isArray(datas) ? datas.length : 0;

  // This container defines the area where dots will be placed (absolute).
  const containerRef = useRef(null);
  const { getButtonsStyle } = useButtonsPosition({
    containerRef,
    totalCount,
    space: DOTS.space,
    offsetX: 0,
    offsetY, // distance from bottom edge
  });

  if (totalCount === 0) {
    return <div ref={containerRef} style={{ position: "relative", height: 0, ...style }} />;
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: Math.max(DOTS.dotSize + offsetY * 2, 48), // enough height for dots
        display: "block",
        ...style,
      }}
    >
      {datas.map((dot, i) => (
        <Dot
          key={dot.id ?? i}
          index={i}                               // position is based on index
          currentIndex={cardClickedIndex}
          getButtonsStyle={getButtonsStyle}
          dotSize={DOTS.dotSize}
          onClick={() => onDotClick?.(dot.id ?? i)}
        />
      ))}
    </div>
  );
}
