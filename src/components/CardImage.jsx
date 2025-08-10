import React from "react";

export default function CardImage({
  src,
  alt = "",
  width = 220,         // px
  height = 123,        // px
  radius = 10,         // px
  opacity = 1,
  website,
  style = {},
  position = { top: 30, left: 0 }, // position offset in px
}) {
  const handleClick = () => {
    if (website) {
      if (window.top !== window.self) {
        // Inside iframe or widget
        window.top.location.href = website;
      } else {
        // Not in iframe
        window.location.href = website;
      }
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{
        display: "block",
        borderRadius: radius,
        opacity,
        cursor: website ? "pointer" : "default",
        position: "absolute", // so we can place it anywhere in the card
        top: position.top,
        left: position.left,
        ...style,
      }}
      onClick={handleClick}
    />
  );
}
