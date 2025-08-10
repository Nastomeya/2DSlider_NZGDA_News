import React from "react";

export default function CardTitleText({
  title,
  color = "white",
  align = "left",
  fontSize = 24,
  distanceFromTop = 30,  // px offset from top edge of card
  distanceFromLeft = 30, // px offset from left edge of card
  style = {},
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: distanceFromTop,
        left: distanceFromLeft,
        textAlign: align,
        fontSize,
        fontFamily: "'Bebas Neue', sans-serif",
        lineHeight: 1,
        color,
        ...style,
      }}
    >
      {title}
    </div>
  );
}
