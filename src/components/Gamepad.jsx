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
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
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
  const y = verticalMode === "pixel"
    ? position[1]
    : (containerHeight ? position[1] * containerHeight : position[1]); // fallback to raw value if containerHeight missing


  const tx = x - pxWidth / 2;
  const ty = y - pxHeight / 2;

  const baseStyle = {
    position: "absolute",
    width: pxWidth,
    height: pxHeight,
    left: Math.round(x),
    top: Math.round(y),
    // Shift origin to the element center, then rotate
    transform: `translate(${Math.round(tx)}px, ${Math.round(ty)}px) rotate(${rotation}deg)`,
    transformOrigin: "center center",
    zIndex: 0,
    ...style,
  };


  if (!color || mode === "image") {
    return (
      <img
        src={gamepadImage}
        alt="Gamepad"
        style={baseStyle}
      />
    );
  }


  // Tinted mode using CSS mask
  return (
    <div
      aria-label="Gamepad"
      style={{
        ...baseStyle,
        backgroundColor: color,
        WebkitMaskImage: `url(${gamepadImage})`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        WebkitMaskPosition: "center",
        maskImage: `url(${gamepadImage})`,
        maskRepeat: "no-repeat",
        maskSize: "contain",
        maskPosition: "center",
      }}
    />
  );
}
