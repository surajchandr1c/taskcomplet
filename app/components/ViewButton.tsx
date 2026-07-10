import React from "react";
import Link from "next/link";

type ViewButtonProps = {
  href?: string;
  disabled?: boolean;
  label?: string;
};

export default function ViewButton({ href, disabled = false, label = "View" }: ViewButtonProps) {
  if (disabled || !href) {
    return (
      <button className="rounded border border-zinc-700 bg-zinc-800 px-3 py-1 text-sm font-medium text-zinc-500 cursor-not-allowed" disabled>
        {label}
      </button>
    );
  }

  return (
    <Link href={href} className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-500 transition-colors">
      {label}
    </Link>
  );
}
