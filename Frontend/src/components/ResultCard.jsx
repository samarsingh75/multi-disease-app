import React, { useEffect, useState } from "react";

const riskConfig = {
  Low: {
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    glow: "shadow-emerald-500/10",
    bar: "bg-emerald-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  Medium: {
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    glow: "shadow-amber-500/10",
    bar: "bg-amber-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  High: {
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    glow: "shadow-red-500/10",
    bar: "bg-red-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },
};

function AnimatedNumber({ target, suffix = "" }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = 16;
    const steps = duration / step;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setDisplay(target);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start * 10) / 10);
      }
    }, step);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function ResultCard({ riskLevel, probability, accuracy }) {
  const [visible, setVisible] = useState(false);
  const cfg = riskConfig[riskLevel] || riskConfig["Low"];

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const probPercent = Math.round((probability || 0) * 100);
  const accPercent = Math.round((accuracy || 0));

  return (
    <div
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div
        className={`rounded-2xl border ${cfg.border} ${cfg.bg} shadow-xl ${cfg.glow} overflow-hidden`}
      >
        {/* Header */}
        <div className={`px-6 pt-5 pb-4 flex items-center gap-3 border-b border-white/[0.06]`}>
          <div className={`${cfg.color} flex items-center gap-2`}>
            {cfg.icon}
            <span className="font-display text-sm font-semibold tracking-wider uppercase">
              Prediction Result
            </span>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Risk Level Badge */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono tracking-widest uppercase text-slate-400">
              Risk Level
            </span>
            <span
              className={`${cfg.color} ${cfg.bg} border ${cfg.border} px-4 py-1.5 rounded-full text-sm font-display font-bold tracking-wider uppercase`}
            >
              {riskLevel}
            </span>
          </div>

          {/* Probability */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono tracking-widest uppercase text-slate-400">
                Probability
              </span>
              <span className={`font-display text-2xl font-bold ${cfg.color}`}>
                <AnimatedNumber target={probPercent} suffix="%" />
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
              <div
                className={`h-full ${cfg.bar} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: visible ? `${probPercent}%` : "0%" }}
              />
            </div>
          </div>

          {/* Model Accuracy */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono tracking-widest uppercase text-slate-400">
                Model Accuracy
              </span>
              <span className="font-display text-2xl font-bold text-indigo-400">
                <AnimatedNumber target={accPercent} suffix="%" />
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full bg-indigo-400 rounded-full transition-all duration-1000 ease-out"
                style={{ width: visible ? `${accPercent}%` : "0%" }}
              />
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-[11px] font-body text-slate-500 pt-1 border-t border-white/[0.05]">
            ⚠ This is an AI-assisted prediction. Always consult a qualified medical professional for diagnosis.
          </p>
        </div>
      </div>
    </div>
  );
}
