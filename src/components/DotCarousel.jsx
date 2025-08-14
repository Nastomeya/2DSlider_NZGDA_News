import React, { useRef } from "react";
import Dot from "./Dot";
import { useButtonsPosition } from "./useButtonsPosition";

export default function DotCarousel({
  datas,
  onDotClick,
  cardClickedIndex,
  isMobile,
  style = {},
}) {

  const totalCount = Array.isArray(datas) ? datas.length : 0;
  const dotSize = isMobile ? 13 : 17;
  const space = isMobile ? 30 : dotSize * 2;
  const offsetY = isMobile ? 35 :85;
  const top = isMobile ? 30 : 25;

  // This container defines the area where dots will be placed (absolute).
  const containerRef = useRef(null);
  const { getButtonsStyle } = useButtonsPosition({
    containerRef,
    totalCount,
    space,
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
        top: top,
        height: Math.max(dotSize + offsetY * 2, 48), // enough height for dots
        width: "100%",         // Make container width fluid
        margin: "0 auto",
        ...style,
      }}
    >
      {datas.map((dot, i) => (
        <Dot
          key={dot.id ?? i}
          id={i}                               // position is based on index
          currentIndex={cardClickedIndex}
          style={getButtonsStyle(i, dotSize)}      // Pass computed position styles here
          onClick={() => onDotClick?.(dot.id ?? i)}
        />
      ))}
    </div>
  );
}
