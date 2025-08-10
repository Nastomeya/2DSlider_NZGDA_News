import React from "react";

export default function CardDateText({
  date,
  color = "white",
  align = "right",
  fontSize = 14,
  distanceFromCard = 8, // px offset from top/right edges
  style = {},
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: distanceFromCard,
        right: distanceFromCard,
        textAlign: align,
        fontSize,
        fontFamily: "'Montserrat', sans-serif",
        lineHeight: 1.22,
        color,
        ...style,
      }}
    >
      {date}
    </div>
  );
}
