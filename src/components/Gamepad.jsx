import React from "react";
import gamepadImage from "../assets/images/Gamepad-Vector.png";

export default function Gamepad({
  width = 160,
  height = 100,
  position = [0, 0],
  rotation = 0,          // rotateZ in degrees for 2D
  color,                 // e.g. "#3f4d6b" to tint
  mode = "mask",         // "mask" | "image"
  style = {},
}) {
  const [x, y] = position;

  if (!color || mode === "image") {
    // Plain image mode (no tint)
    return (
      <img
        src={gamepadImage}
        alt="Gamepad"
        width={width}
        height={height}
        style={{
          position: "absolute",
          transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
          transformOrigin: "top left",
          display: "block",
          ...style,
        }}
      />
    );
  }

  // Tinted mode using CSS mask: the PNG’s alpha becomes the mask, and we fill with `color`
  return (
    <div
      aria-label="Gamepad"
      style={{
        position: "absolute",
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
        transformOrigin: "top left",
        width,
        height,
        backgroundColor: color,
        WebkitMaskImage: `url(${gamepadImage})`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        WebkitMaskPosition: "center",
        maskImage: `url(${gamepadImage})`,
        maskRepeat: "no-repeat",
        maskSize: "contain",
        maskPosition: "center",
        ...style,
      }}
    />
  );
}
