import React from "react";

type PageFallbackProps = {
  state: "loading" | "notfound";
  message?: string;
};

export default function PageFallback({ state, message }: PageFallbackProps) {
  if (state === "loading") {
    return <div className="p-8 text-white">Loading...</div>;
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-semibold">Not Found</h1>
      <p className="text-zinc-400">{message ?? "No content found."}</p>
    </div>
  );
}
