import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import CarouselContainer from "./components/CarouselContainer";
import { sortedDatasByDate } from "./components/sortedDatasByDate";

const MOBILE_BP = 768;
const ASPECT = { mobile: 0.85, desktop: 2.0125 };
const MAX_STAGE_WIDTH = 3600; // Increased to accommodate 5 cards (5 * 420 + 4 * 60 + padding)
const USE_ASPECT_BOX = false; // Changed to false for better carousel display

export default function App() {
  const stageRef = useRef(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [datas, setDatas] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BP);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // data
  useEffect(() => {
    let cancelled = false;
    fetch("/api-data/datas.json")
      .then(r => { if (!r.ok) throw new Error("Failed to fetch JSON"); return r.json(); })
      .then(d => { if (!cancelled) setDatas(sortedDatasByDate(d)); })
      .catch(e => { console.error(e); if (!cancelled) setDatas([]); });
    return () => { cancelled = true; };
  }, []);

  // Immediate mobile detection with useEffect (not useLayoutEffect)
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newIsMobile = newWidth < MOBILE_BP;

      // Update both states immediately
      setWindowWidth(newWidth);
      setIsMobile(newIsMobile);
    };

    // Set initial values
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Optional: Also listen to orientationchange for mobile devices
    window.addEventListener('orientationchange', () => {
      // Small delay to ensure dimensions are updated after orientation change
      setTimeout(handleResize, 100);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);


  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const applySize = () => {
      if (USE_ASPECT_BOX) {
        const target = isMobile ? ASPECT.mobile : ASPECT.desktop;
        const vw = windowWidth;
        const vh = window.innerHeight * 0.9;
        let width = Math.min(vw, Math.floor(vh * target));
        width = Math.min(width, MAX_STAGE_WIDTH);
        const height = Math.floor(width / target);

        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.margin = "0 auto";
      } else {
        // Use full available width for carousel
        const calculatedWidth = Math.min(windowWidth, MAX_STAGE_WIDTH);

        el.style.width = `${calculatedWidth}px`;
        el.style.height = "";
        el.style.maxWidth = "none";
        el.style.margin = "0 auto";
      }

      // Tell parent iframe
      const h = el.getBoundingClientRect().height;
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: "iframe-resize", height: h }, "*");
      }
    };

    applySize();
  }, [isMobile, windowWidth]); // Depend on both mobile state and window width


  if (datas === null) return <div style={{ padding: 16 }}>Loading…</div>;

  return (
    <div
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      style={{
        background: "white",
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 0px" // Add some vertical padding
      }}
    >
      <div ref={stageRef} style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        overflow: "visible" // Allow carousel to show properly
      }}>
        <CarouselContainer datas={datas} isAutoPlaying={isAutoPlaying} isMobile={isMobile} />
      </div>
    </div>
  );
}
