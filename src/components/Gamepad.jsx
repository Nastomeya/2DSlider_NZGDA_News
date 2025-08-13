import React, { useEffect, useState } from "react";
import gamepadImage from "../assets/images/Gamepad-Vector.png";

export default function Gamepad({
  width = 0.2,        // fraction of viewport width
  height = 0.2,       // fraction of viewport width (square)
  position = [0, 0],  // fractions of viewport [xFraction, yFraction]
  rotation = 0,
  color,              // e.g. "#3f4d6b"
  mode = "mask",
  verticalMode = "pixel", // "pixel" | "fraction"
  containerHeight = 0,    // required if verticalMode="fraction"
  style = {},
}) {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // Track viewport resize
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Convert fractions to pixels
  const pxWidth = width * viewportWidth;
  const pxHeight = height * viewportWidth; // keep square based on width
  const x = position[0] * viewportWidth;
  const y =
    verticalMode === "pixel"
      ? position[1]
      : containerHeight
        ? position[1] * containerHeight
        : position[1]; // fallback to raw value if containerHeight missing

  if (!color || mode === "image") {
    return (
      <img
        src={gamepadImage}
        alt="Gamepad"
        width={pxWidth}
        height={pxHeight}
        style={{
          position: "absolute",
          transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
          transformOrigin: "top left",
          display: "block",
          zIndex: 0,
          ...style,
        }}
      />
    );
  }

  // Tinted mode using CSS mask
  return (
    <div
      aria-label="Gamepad"
      style={{
        position: "absolute",
        width: pxWidth,
        height: pxHeight,
        backgroundColor: color,
        WebkitMaskImage: `url(${gamepadImage})`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        WebkitMaskPosition: "center",
        maskImage: `url(${gamepadImage})`,
        maskRepeat: "no-repeat",
        maskSize: "contain",
        maskPosition: "center",
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
        transformOrigin: "top left",
        zIndex: 0,
        ...style,
      }}
    />
  );
}
