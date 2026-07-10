import React from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export default function PageHeader({ title, subtitle, className = "" }: PageHeaderProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
      {subtitle ? <p className="text-zinc-400 mt-1 text-sm">{subtitle}</p> : null}
    </div>
  );
}
