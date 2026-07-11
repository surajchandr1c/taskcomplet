import React from "react";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export default function Badge({
  children,
  variant = "default",
  className = "",
  ...props
}: BadgeProps) {
  const base = "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider select-none";

  const variants: Record<BadgeVariant, string> = {
    default: "bg-zinc-800 text-zinc-300 border border-zinc-700",
    success: "bg-emerald-950/40 text-emerald-400 border border-emerald-900/50",
    warning: "bg-amber-950/40 text-amber-400 border border-amber-900/50",
    danger: "bg-red-950/40 text-red-400 border border-red-900/50",
    info: "bg-blue-950/40 text-blue-400 border border-blue-900/50",
  };

  return (
    <span
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
