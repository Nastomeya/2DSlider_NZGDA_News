import React from "react";

export default function CardContentText({
  content,
  isMobile = false,
  color = "white",
  align = "left",
  distanceFromTop = 80,   // px offset from top of card
  distanceFromLeft = 30,  // px offset from left of card
  style = {},
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: distanceFromTop,
        left: distanceFromLeft,
        textAlign: align,
        fontSize: isMobile ? 13 : 10, // scaled to match your 0.13 vs 0.1 units
        fontFamily: "'Montserrat', sans-serif",
        lineHeight: 1.3,
        color,
        maxWidth: "80%", // roughly like your maxWidth: 2.1
        ...style,
      }}
    >
      {content}
    </div>
  );
}
