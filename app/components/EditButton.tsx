import React from "react";

type EditButtonProps = {
  onClick: () => void;
  label?: string;
  className?: string;
  disabled?: boolean;
};

export default function EditButton({ onClick, label = "Edit", className = "", disabled = false }: EditButtonProps) {
  const base = `whitespace-nowrap rounded border border-zinc-800 bg-zinc-900/45 px-2.5 py-1 text-xs font-medium text-zinc-400 shadow-sm transition-colors ${className}`;
  const disabledCls = disabled ? " opacity-50 cursor-not-allowed" : "hover:border-zinc-700 hover:text-white";

  return (
    <button
      type="button"
      onClick={(e) => {
        if (disabled) return;
        onClick();
      }}
      disabled={disabled}
      className={`${base}${disabledCls}`.trim()}
    >
      {label}
    </button>
  );
}
