import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageLayout({ children, title, subtitle, accentColor = "cyan", icon }) {
  const navigate = useNavigate();

  const accentMap = {
    cyan: {
      gradient: "from-cyan-500/20 via-transparent to-transparent",
      border: "border-cyan-500/20",
      text: "text-cyan-400",
      dot: "bg-cyan-400",
    },
    rose: {
      gradient: "from-rose-500/20 via-transparent to-transparent",
      border: "border-rose-500/20",
      text: "text-rose-400",
      dot: "bg-rose-400",
    },
    violet: {
      gradient: "from-violet-500/20 via-transparent to-transparent",
      border: "border-violet-500/20",
      text: "text-violet-400",
      dot: "bg-violet-400",
    },
    amber: {
      gradient: "from-amber-500/20 via-transparent to-transparent",
      border: "border-amber-500/20",
      text: "text-amber-400",
      dot: "bg-amber-400",
    },
  };

  const acc = accentMap[accentColor] || accentMap.cyan;

  return (
    <div className="min-h-screen bg-[#060b14] relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial accent */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial ${acc.gradient} blur-3xl opacity-60`}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        {/* Nav */}
        <div className="mb-8 animate-fade-up opacity-0-init">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-body text-slate-400 hover:text-cyan-400 transition-colors group"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Dashboard
          </button>
        </div>

        {/* Header */}
        <div className="mb-8 animate-fade-up-1 opacity-0-init">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-1.5 h-1.5 rounded-full ${acc.dot} animate-pulse`} />
            <span className={`text-xs font-mono tracking-widest uppercase ${acc.text}`}>
              Diagnostic Module
            </span>
          </div>
          <div className="flex items-center gap-4">
            {icon && <div className={`${acc.text} opacity-80`}>{icon}</div>}
            <div>
              <h1 className="font-display text-3xl font-bold text-white tracking-tight">
                {title}
              </h1>
              <p className="text-sm font-body text-slate-400 mt-1">{subtitle}</p>
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
