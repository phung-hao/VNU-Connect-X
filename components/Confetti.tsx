import React, { useEffect, useState } from 'react';

const CONFETTI_COLORS = ['#007BFF', '#FFFFFF', '#40E0D0'];
const CONFETTI_COUNT = 70;

interface ConfettiPiece {
  id: number;
  style: React.CSSProperties;
}

const Confetti: React.FC = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const newPieces = Array.from({ length: CONFETTI_COUNT }).map((_, i) => {
      const style: React.CSSProperties = {
        '--x-end': `${(Math.random() - 0.5) * 800}px`,
        '--y-end': `${(Math.random() - 0.5) * 800}px`,
        '--rotation': `${Math.random() * 720 - 360}deg`,
        '--delay': `${Math.random() * 0.2}s`,
        '--duration': `${Math.random() * 0.5 + 1}s`, // Duration between 1s and 1.5s
        backgroundColor: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        animationName: 'confetti-burst',
        animationTimingFunction: 'ease-out',
        animationFillMode: 'forwards',
        animationDelay: 'var(--delay)',
        animationDuration: 'var(--duration)',
        mixBlendMode: 'multiply',
      };
      return { id: i, style };
    });
    setPieces(newPieces);
  }, []);

  if (pieces.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[10000]" aria-hidden="true">
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="absolute top-0 left-0 w-2 h-4 rounded-sm"
          style={piece.style}
        />
      ))}
    </div>
  );
};

export default Confetti;
