import { useState } from "react";

export function useHoverEffect() {
  const [isHovered, setHovered] = useState(false);

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
    setHovered(true);
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "auto";
    setHovered(false);
  };

  return {
    isHovered,
    handlePointerOver,
    handlePointerOut,
  };
}
