import React from "react";

type RemoveButtonProps = {
  onClick: () => void;
  label?: string;
  className?: string;
  disabled?: boolean;
};

export default function RemoveButton({ onClick, label = "Remove", className = "", disabled = false }: RemoveButtonProps) {
  const base = `whitespace-nowrap rounded border border-red-700 bg-red-600 px-2.5 py-1 text-xs font-medium text-white shadow-sm ${className}`;
  const disabledCls = disabled ? " opacity-50 cursor-not-allowed bg-red-700 border-red-700" : "hover:bg-red-500";

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
