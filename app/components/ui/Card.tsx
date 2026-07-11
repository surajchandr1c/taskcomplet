import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  hoverable?: boolean;
};

export default function Card({
  children,
  hoverable = false,
  className = "",
  ...props
}: CardProps) {
  const baseClass = "bg-zinc-950/40 border border-zinc-800 rounded-xl p-4";
  const hoverClass = hoverable ? "hover:scale-[1.01] transition-all hover:border-zinc-700 hover:bg-zinc-950/60" : "";

  return (
    <div
      className={`${baseClass} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
