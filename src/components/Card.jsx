import React from "react";
import CardBoard from "./CardBoard";
import CardTitleText from "./CardTitleText";
import CardDateText from "./CardDateText";
import CardContentText from "./CardContentText";
import CardImage from "./CardImage";

function truncateWithEllipsis(str, maxChars) {
  return str && str.length > maxChars ? str.slice(0, maxChars - 3) + "[...]" : str;
}

export default function Card({
  website,
  image,
  title,
  date,
  contentText,
  position = [0, 0], // Only X, Y for 2D positioning
  onClick,
  hasBeenClicked,
  isMobile,
}) {
  return (
    <div
      style={{
        position: "relative",
        transform: `translate(${position[0]}px, ${position[1]}px)`,
        cursor: !hasBeenClicked ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      <CardBoard hasBeenClicked={hasBeenClicked} />
      <CardTitleText hasBeenClicked={hasBeenClicked} title={truncateWithEllipsis(title, 45)} />
      <CardDateText hasBeenClicked={hasBeenClicked} date={date} />
      <CardContentText
        content={truncateWithEllipsis(contentText, isMobile ? 183 : 312)}
        hasBeenClicked={hasBeenClicked}
        isMobile={isMobile}
      />
      <CardImage src={image} alt={title} website={website} />
    </div>
  );
}
