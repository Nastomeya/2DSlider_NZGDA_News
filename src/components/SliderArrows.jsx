import React, { useRef } from "react";
import SliderArrowBtn from "./SliderArrowBtn";            // 2D button using background images
import { useButtonsPosition } from "./useButtonsPosition"; // 2D positioning hook
import { mod } from "./mod";

const BTN_DATAS = [{ id: 0 }, { id: 1 }];

export default function SliderArrows({
  onBtnClick,
  currentIndex,
  totalSlides,
  isMobile,
  style = {},
}) {

  const size = isMobile ? 50 : 70;
  const offsetX = isMobile ? 100 : 300;
  const offsetY = isMobile ? 0 : 0;
  const top = isMobile ? -25 : -133;
  const space = isMobile ? 60 : 85;
  // Container that defines the coordinate space for bottom placement
  const containerRef = useRef(null);
  // Position two buttons centered as a pair, shifted by offsetX and lifted by offsetY
  const { getButtonsStyle } = useButtonsPosition({
    containerRef,
    totalCount: BTN_DATAS.length,
    space,
    offsetX,
    offsetY,
  });

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        top: top,
        height: Math.max(size + offsetY * 2, 64),
        pointerEvents: "none", // container transparent to clicks, buttons still clickable
        margin: "0 auto",
        ...style,
      }}
    >
      {BTN_DATAS.map((btn, i) => (
        <SliderArrowBtn
          key={btn.id}
          id={btn.id} // 0 = left, 1 = right
          size={size}
          onClick={() => {
            const next = mod(currentIndex + (btn.id % 2 === 0 ? -1 : 1), totalSlides);
            onBtnClick?.(next);
          }}
          // make the button absolutely positioned by the hook
          style={{
            ...getButtonsStyle(i, size),
            pointerEvents: "auto",
          }}
        />
      ))}
    </div>
  );
}
