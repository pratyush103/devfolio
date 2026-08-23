'use client';

import React, { useState, useEffect } from 'react';

export default function CausticsOverlay() {
  const [opacity, setOpacity] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const progress = Math.min(1, Math.max(0, (scrollY - 250) / (window.innerHeight * 1.2)));
      setOpacity(progress * 0.18);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (opacity <= 0.01) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-300"
      style={{
        opacity: opacity,
        backgroundImage: 'radial-gradient(ellipse at 50% 0%, var(--caustic-color-1, rgba(56, 189, 248, 0.4)) 0%, var(--caustic-color-2, rgba(45, 212, 191, 0.15)) 45%, transparent 70%)',
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
    />
  );
}
