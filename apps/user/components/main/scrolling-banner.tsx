'use client';

import React from 'react';
import Marquee from 'react-fast-marquee';

interface ScrollingBannerProps {
  items: string[];
  speed?: number;
  pauseOnHover?: boolean;
  gradientColors?: [string, string]; // [startColor, endColor]
  textColor?: string;
  fontSize?: string;
  direction?: 'left' | 'right';
}

export function ScrollingBanner({
  items,
  speed = 30,
  pauseOnHover = true,
  gradientColors = ['#4776E6', '#8E54E9'],
  textColor = 'white',
  fontSize = '1rem',
  direction = 'left',
}: ScrollingBannerProps) {
  const marqueeSpeed = Math.max(1, Math.min(200, 6000 / speed));

  const itemStyle: React.CSSProperties = {
    padding: '0 2rem',
    fontSize,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    background: `linear-gradient(90deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
    filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.4))',
  };

  return (
    <div
      className='full-width-banner-container'
      style={{
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
      }}
    >
      <Marquee
        speed={marqueeSpeed}
        direction={direction}
        pauseOnHover={pauseOnHover}
        gradient={false}
        style={{
          background: 'transparent',
          padding: '16px 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {items.map((item, index) => (
          <span key={index} style={itemStyle}>
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
