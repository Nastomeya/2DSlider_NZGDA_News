import React, { useEffect, useMemo, useRef, useState } from "react";
import Card from "./Card";
import { mod } from "./mod";

export default function CardCarousel({
  datas = [],
  cardClickedIndex,
  onCardClick,
  isMobile = false,
  cardWidth = 286,
  gap = 16,
  visibleCount = 7,
  style = {},
}) {
  const N = datas.length;

  const START_OFFSET = N;
  const CARD_ASPECT = 3.4 / 2.325;             // ≈ 1.425
  const calculatedHeight = Math.round(cardWidth * CARD_ASPECT);
  const finalCardHeight = calculatedHeight; // Use provided height or calculated

  const looped = useMemo(() => [...datas, ...datas, ...datas], [datas]);

  const [trackIndex, setTrackIndex] = useState(START_OFFSET + (cardClickedIndex ?? 0));
  const [withTransition, setWithTransition] = useState(true);

  useEffect(() => {
    if (typeof cardClickedIndex === "number" && N > 0) {
      // Only update if the currentIndex change came from outside (not from our own click)
      const expectedDataIndex = mod(trackIndex, N);
      if (cardClickedIndex !== expectedDataIndex) {
        setWithTransition(true);
        setTrackIndex(START_OFFSET + cardClickedIndex);
      }
    }
  }, [cardClickedIndex, N, START_OFFSET, trackIndex]);


  const handleTransitionEnd = () => {
    if (N === 0) return;
    let next = trackIndex;
    if (trackIndex >= 2 * N) next = trackIndex - N;
    else if (trackIndex < N) next = trackIndex + N;

    if (next !== trackIndex) {
      setWithTransition(false);
      setTrackIndex(next);
      // trackRef?.current?.offsetHeight;
      requestAnimationFrame(() => setWithTransition(true));
    }
  };

  const onCardClickInternal = (displayIdx) => {
    if (N === 0) return;
    // Find the closest instance of this card to the current position
    const targetDataIndex = mod(displayIdx, N);
    const currentCenter = trackIndex;

    // Find which section would give us the shortest distance
    const candidates = [
      targetDataIndex,           // First section
      targetDataIndex + N,       // Second section  
      targetDataIndex + 2 * N    // Third section
    ];

    const distances = candidates.map(candidate => Math.abs(candidate - currentCenter));
    const minDistanceIndex = distances.indexOf(Math.min(...distances));
    const targetTrackIndex = candidates[minDistanceIndex];

    // Set the track index directly for smooth animation
    setWithTransition(true);
    setTrackIndex(targetTrackIndex);

    // Notify parent of the data index change
    onCardClick?.(targetDataIndex);
  };

  if (N === 0) {
    return (
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: 0,
        }}
      />
    );
  }

  const viewportWidth = visibleCount * (cardWidth + gap) - gap;
  const trackWidth = looped.length * (cardWidth + gap) - gap;
  const cardLeft = trackIndex * (cardWidth + gap);
  const offsetX = (trackWidth / 2) - (cardLeft + cardWidth / 2);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        width: `${viewportWidth}px`,
        height: `${finalCardHeight}px`,
        margin: "0 auto",
        background: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      <div
        //ref={trackRef}
        onTransitionEnd={handleTransitionEnd}
        style={{
          display: "flex",
          gap: `${gap}px`,
          width: `${trackWidth}px`,
          height: "100%",
          transform: `translate3d(${offsetX}px, 0, 0)`,
          transition: withTransition ? "transform 360ms cubic-bezier(.2,.8,.2,1)" : "none",
          willChange: "transform",
          alignItems: "stretch",
          position: "relative",
        }}
      >
        {looped.map((card, i) => (
          <div
            key={`${i}-${card.id ?? "card"}`}
            style={{
              width: `${cardWidth}px`,
              height: "100%",
              flex: "0 0 auto",
              position: "relative",
            }}
          >
            <Card
              website={card.website}
              image={card.image}
              title={card.title}
              date={card.date}
              contentText={card.contentText}
              hasBeenClicked={card.id === cardClickedIndex}
              onClick={() => onCardClickInternal(i)}
              isMobile={isMobile}
            />
          </div>
        ))}
      </div>
    </div>
  );
}