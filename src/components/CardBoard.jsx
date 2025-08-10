import React from 'react';

export default function CardBoard({
  w = 2.386,      // width in your original units
  h = 3.4,        // height in your original units
  r = 0.2,        // corner radius in your original units
  scale = 180,    // px per unit (change to make it bigger/smaller)
  background = '#11234A',
  border = 'rgba(0,0,0,0.08)',
  shadow = '0 8px 24px rgba(0,0,0,0.12)',
  style = {},
  ...rest
}) {
  const widthPx = w * scale;
  const radiusPx = r * scale;

  return (
    <div
      {...rest}
      style={{
        width: widthPx,                  // set width, height follows from aspect-ratio
        aspectRatio: `${w} / ${h}`,      // keep exact proportion 2.386 : 3.4
        borderRadius: radiusPx,          // 0.2 units -> px
        background,
        border: `1px solid ${border}`,
        boxShadow: shadow,
        overflow: 'hidden',
        ...style,
      }}
    />
  );
}
