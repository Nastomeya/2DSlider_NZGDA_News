import React from "react";

export default function CardTitleText({
  title,
  color,
  align = "left",
  fontSize = "clamp(1.5rem, 8cqw, 2.3rem)", // Responsive font size based on container width
  position = { top: "41%", left: "5%" }, // Use percentages instead of fixed pixels
  lineHeight = 1.1,
  maxWidth = "90%", // Responsive max width (100% - left position - right margin)
  style = {},
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        textAlign: align,
        fontSize,
        fontFamily: "'Bebas Neue', sans-serif",
        lineHeight: lineHeight,
        color,
        maxWidth,
        // Additional responsive properties
        width: "auto",
        wordWrap: "break-word",
        overflow: "hidden",
        ...style,
      }}
    >
      {title}
    </div>
  );
}