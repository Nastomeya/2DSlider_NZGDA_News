import React from "react";
import { useHoverEffect } from "./useHoverEffect";

import leftArrow from "../assets/images/btnImages/LeftArrow.png";
import leftHover from "../assets/images/btnImages/LeftHover.png";
import rightArrow from "../assets/images/btnImages/RightArrow.png";
import rightHover from "../assets/images/btnImages/RightHover.png";

export default function SliderArrowBtn({ id, size = 48, onClick, style = {} }) {
  const isRightArrow = id % 2 === 1;
  const { isHovered, handlePointerOver, handlePointerOut } = useHoverEffect();

  const imgSrc = isHovered
    ? (isRightArrow ? rightHover : leftHover)
    : (isRightArrow ? rightArrow : leftArrow);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onMouseEnter={handlePointerOver}
      onMouseLeave={handlePointerOut}
      style={{
        width: size,
        height: size,
        background: `url(${imgSrc}) center / contain no-repeat`,
        border: "none",
        padding: 0,
        margin: 0,
        cursor: "pointer",
        borderRadius: "50%",
        ...style,
      }}
      aria-label={isRightArrow ? "Next slide" : "Previous slide"}
    />
  );
}
