import React from "react";

type SkeletonVariant = "text" | "circular" | "rectangular";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
};

export default function Skeleton({
  variant = "rectangular",
  width,
  height,
  className = "",
  style,
  ...props
}: SkeletonProps) {
  const base = "animate-pulse bg-zinc-900";

  const variants: Record<SkeletonVariant, string> = {
    text: "h-3 w-full rounded",
    circular: "rounded-full",
    rectangular: "rounded-xl",
  };

  const customStyle: React.CSSProperties = {
    width: width !== undefined ? width : undefined,
    height: height !== undefined ? height : undefined,
    ...style,
  };

  return (
    <div
      className={`${base} ${variants[variant]} ${className}`}
      style={customStyle}
      {...props}
    />
  );
}
