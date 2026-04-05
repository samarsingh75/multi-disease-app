import React from "react";

export default function Spinner({ size = "md", label = "Analyzing..." }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {/* Pulse ring */}
        <div
          className={`absolute inset-0 rounded-full border-2 border-cyan-400/40 animate-pulse-ring`}
        />
        {/* Spinner */}
        <div
          className={`${sizes[size]} rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400/40 animate-spin`}
        />
      </div>
      {label && (
        <span className="text-xs font-mono tracking-widest uppercase text-cyan-400/70 animate-pulse">
          {label}
        </span>
      )}
    </div>
  );
}
