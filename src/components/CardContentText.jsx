import React from "react";

export default function CardContentText({
  content,
  isMobile = false,
  hasBeenClicked,
  color = hasBeenClicked ? "#ffffffff" : "#9CA4B2",
  align = "left",
  position = { top: 360, left: 30 },
  fontWeight = 100,
  lineHeight = 1.2,
  style = {},
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        textAlign: align,
        fontSize: isMobile ? 13 : 18.5, // scaled to match your 0.13 vs 0.1 units
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: fontWeight,
        lineHeight: lineHeight,
        color,
        maxWidth: "90%", // roughly like your maxWidth: 2.1
        ...style,
      }}
    >
      {content}
    </div>
  );
}
