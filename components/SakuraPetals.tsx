"use client";

import { useMemo } from "react";

const PETAL_COUNT = 40;

export default function SakuraPetals() {
  const petals = useMemo(() => {
    return Array.from({ length: PETAL_COUNT }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${10 + Math.random() * 16}s`,
      delay: `${Math.random() * 20}s`,
      scale: 0.35 + Math.random() * 0.45,
    }));
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {petals.map((p) => (
        <div
          key={p.id}
          className="sakura-petal"
          style={{
            left: p.left,
            animationDuration: p.duration,
            animationDelay: p.delay,
            transform: `scale(${p.scale})`,
          }}
        />
      ))}
    </div>
  );
}
