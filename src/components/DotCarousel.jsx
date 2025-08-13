import React, { useRef } from "react";
import Dot from "./Dot";
import { useButtonsPosition } from "./useButtonsPosition";

export default function DotCarousel({
  datas,
  onDotClick,
  cardClickedIndex,
  offsetY = 20,  // px from bottom of the container
  space,
  dotSize,
  style = {},
}) {
  const totalCount = Array.isArray(datas) ? datas.length : 0;

  // This container defines the area where dots will be placed (absolute).
  const containerRef = useRef(null);
  const { getButtonsStyle } = useButtonsPosition({
    containerRef,
    totalCount,
    space,
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
        height: Math.max(dotSize + offsetY * 2, 48), // enough height for dots
        width: "100%",         // Make container width fluid
        maxWidth: 400,         // Or set max width as needed
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
