import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string | boolean;
};

export default function Textarea({
  error = false,
  className = "",
  rows = 4,
  ...props
}: TextareaProps) {
  const baseClass = "w-full p-3 rounded-lg bg-zinc-900 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all";
  const borderClass = error ? "border-red-650 focus:ring-red-500/50" : "border-zinc-800 focus:ring-blue-500/50";

  return (
    <textarea
      rows={rows}
      className={`${baseClass} ${borderClass} ${className}`}
      {...props}
    />
  );
}
