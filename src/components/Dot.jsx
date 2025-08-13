import React, { useState } from "react";

const hoverStrokeColor = "#9ca4b2"; // on hover
const staticColor = "#bcbcbcff";   // default
const displayColor = "#11234A"; // active/current

export default function Dot({
  id,
  currentIndex,
  radius = 6,        // px
  onClick,
  style = {},
}) {
  const isDisplayed = id === currentIndex;
  const [hovered, setHovered] = useState(false);

  const bg = isDisplayed ? displayColor : hovered ? hoverStrokeColor : staticColor;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Go to slide ${id + 1}`}
      aria-pressed={isDisplayed}
      style={{
        width: radius * 2,
        height: radius * 2,
        borderRadius: "50%",
        background: bg,
        border: "none",
        padding: 0,
        margin: 0,
        cursor: "pointer",
        outlineOffset: 2,
        transition: "background 120ms ease",
        ...style,
      }}
    />
  );
}
