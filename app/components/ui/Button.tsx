import React from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-md",
    secondary: "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 hover:text-white",
    danger: "bg-red-650 hover:bg-red-550 text-white border border-red-700/60 shadow-sm",
    outline: "bg-transparent border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white",
    ghost: "bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!loading && icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
