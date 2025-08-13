import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import CarouselContainer from "./components/CarouselContainer";
import { sortedDatasByDate } from "./components/sortedDatasByDate";

const MOBILE_BP = 768;
const ASPECT = { mobile: 0.85, desktop: 2.0125 };
const MAX_STAGE_WIDTH = 1400; // Increased to accommodate 5 cards (5 * 420 + 4 * 60 + padding)
const USE_ASPECT_BOX = false; // Changed to false for better carousel display

export default function App() {
  const stageRef = useRef(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [datas, setDatas] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BP);

  // data
  useEffect(() => {
    let cancelled = false;
    fetch("/api-data/datas.json")
      .then(r => { if (!r.ok) throw new Error("Failed to fetch JSON"); return r.json(); })
      .then(d => { if (!cancelled) setDatas(sortedDatasByDate(d)); })
      .catch(e => { console.error(e); if (!cancelled) setDatas([]); });
    return () => { cancelled = true; };
  }, []);

  // sizing (boring & accurate)
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const mq = window.matchMedia(`(max-width:${MOBILE_BP - 1}px)`);

    const applySize = () => {
      const mobile = mq.matches;
      setIsMobile(mobile);

      if (USE_ASPECT_BOX) {
        const target = mobile ? ASPECT.mobile : ASPECT.desktop;
        const vw = window.innerWidth;
        const vh = window.innerHeight * 0.9; // use up to 90% height
        let width = Math.min(vw, Math.floor(vh * target));
        width = Math.min(width, MAX_STAGE_WIDTH);
        const height = Math.floor(width / target);

        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.margin = "0 auto";
      } else {
        // Use full available width for carousel
        const calculatedWidth = Math.min(window.innerWidth, MAX_STAGE_WIDTH);

        el.style.width = `${calculatedWidth}px`;
        el.style.height = "";                // let children set height
        el.style.maxWidth = "none";          // Remove any max-width constraints
        el.style.margin = "0 auto";
      }

      // tell parent iframe
      const h = el.getBoundingClientRect().height;
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: "iframe-resize", height: h }, "*");
      }
    };

    applySize();
    mq.addEventListener?.("change", applySize);
    window.addEventListener("resize", applySize);
    return () => {
      mq.removeEventListener?.("change", applySize);
      window.removeEventListener("resize", applySize);
    };
  }, []);

  if (datas === null) return <div style={{ padding: 16 }}>Loading…</div>;

  return (
    <div
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      style={{
        background: "white", minHeight: "50vh", display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 0px" // Add some vertical padding
      }}
    >
      <div ref={stageRef} style={{
        width: "100%", display: "flex", justifyContent: "center",
        overflow: "visible" // Allow carousel to show properly
      }}>
        <CarouselContainer datas={datas} isAutoPlaying={isAutoPlaying} isMobile={isMobile} />
      </div>
    </div>
  );
}
