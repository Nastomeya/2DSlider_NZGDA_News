import React from "react";

export default function CardContentText({
  content,
  hasBeenClicked,
  color = hasBeenClicked ? "#ffffffff" : "#9CA4B2",
  align = "left",
  position = { top: "59%", left: "7%" }, // Use percentages instead of fixed pixels
  fontWeight = 100,
  lineHeight = 1.2,
  maxWidth = "88%", // Responsive max width (100% - left position)
  style = {},
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        textAlign: align,
        fontSize: "clamp(1rem, 4cqw, 1.2rem)",// scaled to match your 0.13 vs 0.1 units
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: fontWeight,
        lineHeight: lineHeight,
        color,
        maxWidth,
        // Additional responsive properties
        width: "auto",
        wordWrap: "break-word",
        overflow: "hidden",
        transform: "translateY(0)", // Can be used to fine-tune vertical positioning
        ...style,
      }}
    >
      {content}
    </div>
  );
}