import React from "react";

export default function CardTitleText({
  title,
  color = "white",
  align = "left",
  fontSize = 38,
  position = { top: 250, left: 20 },
  fontWeight = 300,
  lineHeight = 1.25,
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
        fontWeight: fontWeight,
        lineHeight: lineHeight,
        color,
        maxWidth: "90%", // roughly like your maxWidth: 2.1
        ...style,
      }}
    >
      {title}
    </div>
  );
}
