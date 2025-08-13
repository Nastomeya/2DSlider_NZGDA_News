import React, { useEffect, useState } from "react";

/**
 * Pure 2D CarouselText
 * - Fetches { "title": "..." } from /api-data/siteInfo.json (same as your original)
 * - Uses unit-to-px mapping via `scale` so values match your old Three units:
 *    maxWidth = 5 * scale, fontSize = 0.235 * scale, top offset = 2.55 * scale
 * - Absolutely centers text at the top of its relatively positioned parent
 */
export default function CarouselText({
  // optional overrides if you ever need them
  jsonUrl = "/api-data/siteInfo.json",
  color = "#11234A",
  scale = 120,        // px per "unit" to mirror your Three numbers
  maxWidthUnits = 5,  // matches textConfig.maxWidth
  fontSizeUnits = 0.235,
  lineHeight = 1.2,
  align = "center",
  titleOverride,      // if provided, skip fetch and use this text
  style = {},
}) {
  const [title, setTitle] = useState(titleOverride ?? "");

  useEffect(() => {
    if (titleOverride !== undefined) return; // don't fetch if caller provided a title

    let aborted = false;
    fetch(jsonUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch JSON");
        return res.json();
      })
      .then((data) => {
        if (!aborted) setTitle(data?.title ?? "");
      })
      .catch((err) => {
        console.error("Error loading siteInfo:", err);
        if (!aborted) setTitle("");
      });
    return () => { aborted = true; };
  }, [jsonUrl, titleOverride]);

  const maxWidthPx = maxWidthUnits * scale;
  const fontSizePx = fontSizeUnits * scale;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 0,
        transform: "translateX(-50%)",
        maxWidth: maxWidthPx,
        width: "100%",
        textAlign: align,
        color,
        lineHeight,
        // Use your bold Montserrat if you load it in CSS; falls back gracefully
        fontFamily: "'Montserrat', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        fontWeight: 700,
        fontSize: fontSizePx,
        // Nice crisp rendering
        textRendering: "optimizeLegibility",
        WebkitFontSmoothing: "antialiased",
        ...style,
      }}
      aria-label="Carousel title"
    >
      {title}
    </div>
  );
}
