import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const accentMap = {
  cyan:   { hex: "#22d3ee", glow: "rgba(34,211,238,0.08)",   border: "rgba(34,211,238,0.15)",   text: "text-cyan-400",   dot: "bg-cyan-400",   gradFrom: "#0e7490", gradTo: "#4f46e5" },
  rose:   { hex: "#fb7185", glow: "rgba(251,113,133,0.08)",  border: "rgba(251,113,133,0.15)",  text: "text-rose-400",   dot: "bg-rose-400",   gradFrom: "#e11d48", gradTo: "#7c3aed" },
  violet: { hex: "#a78bfa", glow: "rgba(167,139,250,0.08)",  border: "rgba(167,139,250,0.15)",  text: "text-violet-400", dot: "bg-violet-400", gradFrom: "#7c3aed", gradTo: "#2563eb" },
  amber:  { hex: "#fbbf24", glow: "rgba(251,191,36,0.08)",   border: "rgba(251,191,36,0.15)",   text: "text-amber-400",  dot: "bg-amber-400",  gradFrom: "#d97706", gradTo: "#dc2626" },
};

function AccuracyBar({ value, color }) {
  const pct = Math.min(Math.max(value || 0, 0), 100);
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
        <div className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}88` }} />
      </div>
      <span className="font-display text-sm font-bold tabular-nums" style={{ color, minWidth: 38 }}>
        {value ? `${pct}%` : "—"}
      </span>
    </div>
  );
}

export default function PageLayout({ children, title, subtitle, accentColor = "cyan", icon, accuracy, loadingAcc }) {
  const navigate = useNavigate();
  const acc = accentMap[accentColor] || accentMap.cyan;

  return (
    <div className="min-h-screen bg-[#04080f] relative overflow-hidden">
      {/* Hex grid */}
      <div className="absolute inset-0 hex-bg opacity-100 pointer-events-none" />

      {/* Top ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${acc.glow} 30%, transparent 50%)` }} />

      {/* Top nav */}
      <div className="relative z-10 border-b border-white/[0.04]" style={{ background: "rgba(4,8,15,0.85)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate("/")}
            className="flex items-center gap-2.5 text-sm font-body text-slate-500 hover:text-white transition-colors group">
            <div className="p-1.5 rounded-lg group-hover:bg-white/[0.06] transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
              </svg>
            </div>
            <span className="text-xs font-mono tracking-widest uppercase">Dashboard</span>
          </button>

          {/* Live indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: acc.hex }} />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: acc.hex }} />
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: acc.hex }}>Model Active</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        {/* Page header card */}
        <div className="rounded-2xl mb-5 p-5 animate-fade-up opacity-0-init"
          style={{
            background: "linear-gradient(145deg, rgba(14,22,40,0.9), rgba(8,14,26,0.95))",
            border: `1px solid ${acc.border}`,
            boxShadow: `0 0 40px ${acc.glow}`,
          }}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="p-3 rounded-2xl relative" style={{ background: `${acc.hex}12`, border: `1px solid ${acc.border}`, color: acc.hex }}>
                {icon}
                <div className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none"
                  style={{ background: `radial-gradient(circle at center, ${acc.hex}40, transparent)` }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${acc.dot} animate-pulse`} />
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: acc.hex, opacity: 0.7 }}>
                    Diagnostic Module
                  </span>
                </div>
                <h1 className="font-display text-2xl font-bold text-white tracking-tight">{title}</h1>
                <p className="text-xs font-body text-slate-500 mt-0.5">{subtitle}</p>
              </div>
            </div>

            {/* Accuracy badge */}
            <div className="shrink-0 rounded-xl p-3 min-w-[110px]"
              style={{ background: "rgba(4,8,15,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-[9px] font-mono tracking-widest uppercase text-slate-600 mb-2">Model Accuracy</div>
              {loadingAcc
                ? <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full shimmer" style={{ background: "rgba(255,255,255,0.05)" }} />
                    <span className="text-xs font-mono text-slate-700">…</span>
                  </div>
                : <AccuracyBar value={accuracy} color={acc.hex} />}
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
