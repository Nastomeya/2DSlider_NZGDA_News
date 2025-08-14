import React from 'react';

export default function CardBoard({
  w = 2.386,      
  h = 3.4,        
  r = 0.15,        
  scale = 180,    
  maxWidth = '100%', // Maximum width constraint

  hasBeenClicked,
  background = hasBeenClicked ? 'rgba(97,109,134,0.8)' : 'rgba(17,35,74,0.8)',
  border = 'rgba(0,0,0,0.08)',
  style = {},
  ...rest
}) {
  const radiusPercent = (r / w) * 100; // Convert radius to percentage of width

  return (
    <div
      {...rest}
      style={{
        width: '100%',
        maxWidth: maxWidth,              // Constraint from parent
        aspectRatio: `${w} / ${h}`,      
        borderRadius: `${radiusPercent}%`, // Responsive radius
        background,
        border: `1px solid ${border}`,
        overflow: 'hidden',
        // Use min() for responsive sizing
        fontSize: 'clamp(0.8rem, 2vw, 1.2rem)', // Example: text scales too
        ...style,
      }}
    />
  );
}