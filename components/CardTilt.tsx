"use client";

import { useRef, useState, type ReactNode } from "react";

interface CardTiltProps {
  children: ReactNode;
  className?: string;
  strength?: number; // tilt intensity, default 8
}

export default function CardTilt({ children, className = "", strength = 8 }: CardTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<{
    transform: string;
    transition: string;
  }>({
    transform: "perspective(800px) rotateX(0deg) rotateY(0deg)",
    transition: "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = ref.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * strength;
    const rotateX = -((y - centerY) / centerY) * strength;

    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
    });
  };

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
