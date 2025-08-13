import React from "react";

export default function CardDateText({
  date,
  color = "white",
  align = "right",
  fontSize = 14,
  position = { top: 340, right: 15 },
  fontWeight = 300,
  lineHeight = 1.2,
  style = {},
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: position.top,//distanceFromCard,
        right: position.right,//distanceFromCard,
        textAlign: align,
        fontSize,
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: fontWeight,
        lineHeight: lineHeight,
        color,
        ...style,
      }}
    >
      {date}
    </div>
  );
}
