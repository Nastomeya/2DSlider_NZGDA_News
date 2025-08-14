import React from "react";

export default function CardDateText({
  date,
  color,
  align = "right",
  fontSize = "clamp(0.8rem, 3cqw, 1rem)", // Responsive font size based on container width
  position = { top: "58%", right: "4%" }, // Use percentages instead of fixed pixels
  fontWeight = 300,
  lineHeight = 1.2,
  style = {},
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: position.top,
        right: position.right,
        textAlign: align,
        fontSize,
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: fontWeight,
        lineHeight: lineHeight,
        color,
        // Additional responsive properties
        whiteSpace: "nowrap", // Keep date on single line
        transform: "translateY(-100%)", // Offset to position above bottom edge
        ...style,
      }}
    >
      {date}
    </div>
  );
}