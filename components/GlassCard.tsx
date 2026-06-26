import CardTilt from "@/components/CardTilt";

interface GlassCardProps {
  variant?: "standard" | "strong" | "accent";
  enableTilt?: boolean;
  tiltStrength?: number;
  className?: string;
  children: React.ReactNode;
}

const variantClass = {
  standard: "card-glass",
  strong: "card-glass-strong",
  accent: "card-glass-accent",
};

export default function GlassCard({
  variant = "standard",
  enableTilt = false,
  tiltStrength = 5,
  className = "",
  children,
}: GlassCardProps) {
  const glassClass = `${variantClass[variant]} ${className}`;

  if (enableTilt) {
    return (
      <CardTilt className={glassClass} strength={tiltStrength}>
        {children}
      </CardTilt>
    );
  }

  return <div className={glassClass}>{children}</div>;
}
