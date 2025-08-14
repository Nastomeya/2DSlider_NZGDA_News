import React from "react";

export default function CardImage({
  src,
  alt = "",
  width = 400,         // px
  height = 224.7,        // px
  radius = 15,         // px
  opacity = 1,
  website,
  style = {},
  position = { top: 15, left: 15 }, // position offset in px
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
