import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string | boolean;
  prefixText?: string;
};

export default function Input({
  error = false,
  prefixText,
  className = "",
  ...props
}: InputProps) {
  const baseClass = "w-full h-10 rounded-lg bg-zinc-900 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all";
  const borderClass = error ? "border-red-650 focus:ring-red-500/50" : "border-zinc-800 focus:ring-blue-500/50";
  const paddingClass = prefixText ? "pl-7 pr-3" : "px-3";

  return (
    <div className="relative w-full">
      {prefixText && (
        <span className="absolute left-3 top-2.5 text-sm text-zinc-500 select-none">
          {prefixText}
        </span>
      )}
      <input
        className={`${baseClass} ${borderClass} ${paddingClass} ${className}`}
        {...props}
      />
    </div>
  );
}
