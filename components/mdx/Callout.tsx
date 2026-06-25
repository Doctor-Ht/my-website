import type { ReactNode } from "react";

type CalloutType = "info" | "warning" | "tip" | "important";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const styles: Record<CalloutType, { icon: string; bg: string; border: string; text: string }> = {
  info: {
    icon: "ℹ️",
    bg: "rgba(0,113,227,0.06)",
    border: "var(--color-accent)",
    text: "var(--color-text)",
  },
  warning: {
    icon: "⚠️",
    bg: "rgba(217,119,6,0.06)",
    border: "#d97706",
    text: "var(--color-text)",
  },
  tip: {
    icon: "💡",
    bg: "rgba(5,150,105,0.06)",
    border: "#059669",
    text: "var(--color-text)",
  },
  important: {
    icon: "❗",
    bg: "rgba(99,102,241,0.06)",
    border: "#6366f1",
    text: "var(--color-text)",
  },
};

export default function Callout({ type = "info", title, children }: CalloutProps) {
  const s = styles[type];
  return (
    <div
      className="my-6 rounded-lg border-l-4 p-4"
      style={{ background: s.bg, borderLeftColor: s.border, color: s.text }}
    >
      <div className="flex items-start gap-2">
        <span className="text-lg leading-none mt-0.5">{s.icon}</span>
        <div>
          {title && <p className="font-semibold mb-1">{title}</p>}
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
