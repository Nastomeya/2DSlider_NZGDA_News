import {  useLayoutEffect, useRef, useState } from "react";
export function useButtonsPosition({
  containerRef,
  totalCount,
  space = 24,
  offsetX = 0,
  offsetY = 16,
}) {
  const [rect, setRect] = useState({ width: 0, height: 0 });

  // Measure container size
  useLayoutEffect(() => {
    const el = containerRef?.current;
    if (!el) return;

    const measure = () => {
      const r = el.getBoundingClientRect();
      setRect({ width: r.width, height: r.height });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [containerRef]);

  // Compute centered X position for a given dot index
  const getButtonsXY = (index) => {
    // width spanned by centers across all dots
    const totalWidth = (totalCount - 1) * space;
    const centerX = rect.width / 2 + offsetX;
    const x = centerX + (index * space - totalWidth / 2);

    // y positioned near the bottom (offset upward by offsetY)
    const y = rect.height - offsetY;
    return [x, y];
  };

  /**
   * Convenience: returns absolute-position CSS for a given dot.
   * dotSize is useful to center the dot on its [x,y].
   */
  const getButtonsStyle = (index, dotSize = 12) => {
    const [x, y] = getButtonsXY(index);
    // center the dot by subtracting half its size
    const left = x - dotSize / 2;
    const top = y - dotSize / 2;
    return {
      position: "absolute",
      left: `${left}px`,
      top: `${top}px`,
      width: `${dotSize}px`,
      height: `${dotSize}px`,
    };
  };

  return { getButtonsXY, getButtonsStyle, rect };
}

// Backwards-compat export with the original typo (if you already imported it somewhere)
export const useBottonsPosition = (totalCount, space, offsetX = 0, offsetY = 16) => {
  const containerRef = useRef(null);
  const { getButtonsXY, getButtonsStyle, rect } = useButtonsPosition({
    containerRef,
    totalCount,
    space,
    offsetX,
    offsetY,
  });
  return { containerRef, getButtonsXY, getButtonsStyle, rect };
};
