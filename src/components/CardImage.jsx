import React from "react";

export default function CardImage({
  src,
  alt = "",
  width = "94%",         // Responsive width as percentage
  height = "auto",       // Auto height to maintain aspect ratio
  aspectRatio = "16/9",  // Default aspect ratio (400/224.7 ≈ 1.78 ≈ 16/9)
  radius = "clamp(8px, 3cqw, 20px)", // Responsive border radius
  opacity = 1,
  website,
  style = {},
  position = { top: "2%", left: "3.25%" }, // Position as percentages
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
      style={{
        display: "block",
        width: width,
        height: height,
        aspectRatio: aspectRatio, // Maintain consistent proportions
        objectFit: "cover",       // Ensure image fills the space nicely
        borderRadius: radius,
        opacity,
        cursor: website ? "pointer" : "default",
        position: "absolute",
        top: position.top,
        left: position.left,
        ...style,
      }}
      onClick={handleClick}
    />
  );
}