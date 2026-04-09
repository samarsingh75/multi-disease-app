import React, { useEffect, useState, useRef } from "react";

const RISK = {
  Low:    { color: "#10b981", cls: "text-emerald-400", bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.25)",  glow: "rgba(16,185,129,0.12)",  label: "Low Risk",    grade: "A" },
  Medium: { color: "#f59e0b", cls: "text-amber-400",   bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)", glow: "rgba(245,158,11,0.12)", label: "Medium Risk", grade: "B" },
  High:   { color: "#ef4444", cls: "text-red-400",     bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.25)",  glow: "rgba(239,68,68,0.12)",  label: "High Risk",   grade: "C" },
};

/* Animated counting number */
function AnimNum({ target, suffix = "", duration = 1200 }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf, start = null;
    const ease = t => 1 - Math.pow(1 - t, 3);
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setV(Math.round(ease(p) * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return <>{v}{suffix}</>;
}

/* SVG Radial arc chart */
function RadialArc({ value, max = 100, color, size = 160, strokeWidth = 12, label, sublabel }) {
  const [anim, setAnim] = useState(0);
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(Math.max(value, 0), max) / max;

  useEffect(() => {
    let raf, start = null;
    const dur = 1300;
    const ease = t => 1 - Math.pow(1 - t, 3);
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setAnim(ease(p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  const offset = circ * (1 - anim * pct);
  const displayVal = Math.round(anim * value);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
          {/* Outer track */}
          <circle cx={size/2} cy={size/2} r={r} fill="none"
            stroke="rgba(255,255,255,0.04)" strokeWidth={strokeWidth}/>
          {/* Tick marks */}
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = (i / 20) * 2 * Math.PI;
            const x1 = size/2 + (r - strokeWidth/2 - 2) * Math.cos(angle);
            const y1 = size/2 + (r - strokeWidth/2 - 2) * Math.sin(angle);
            const x2 = size/2 + (r + strokeWidth/2 + 2) * Math.cos(angle);
            const y2 = size/2 + (r + strokeWidth/2 + 2) * Math.sin(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>;
          })}
          {/* Glow arc */}
          <circle cx={size/2} cy={size/2} r={r} fill="none"
            stroke={color} strokeWidth={strokeWidth + 6}
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round" strokeOpacity="0.12"/>
          {/* Main arc */}
          <circle cx={size/2} cy={size/2} r={r} fill="none"
            stroke={color} strokeWidth={strokeWidth}
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}/>
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          <span className="font-display font-bold leading-none" style={{ color, fontSize: size * 0.22 }}>
            <AnimNum target={displayVal} suffix="%" />
          </span>
          <span className="text-[9px] font-mono tracking-widest uppercase text-slate-600">{sublabel}</span>
        </div>
      </div>
      <span className="text-xs font-mono tracking-widest uppercase text-slate-500">{label}</span>
    </div>
  );
}

/* Risk grade badge */
function RiskBadge({ riskLevel, cfg }) {
  const icons = {
    Low:    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>,
    Medium: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>,
    High:   <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>,
  };
  return (
    <div className="flex items-center gap-3 px-6 py-3.5 rounded-2xl"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
      <svg viewBox="0 0 24 24" fill="none" stroke={cfg.color} strokeWidth={2} className="w-6 h-6">
        {icons[riskLevel]}
      </svg>
      <div>
        <div className="font-display text-2xl font-bold leading-none" style={{ color: cfg.color }}>
          {cfg.label}
        </div>
        <div className="text-[10px] font-mono tracking-widest uppercase text-slate-500 mt-0.5">Risk Assessment</div>
      </div>
      {/* Grade */}
      <div className="ml-4 w-10 h-10 rounded-xl flex items-center justify-center font-display text-xl font-bold"
        style={{ background: `${cfg.color}18`, border: `1px solid ${cfg.border}`, color: cfg.color }}>
        {cfg.grade}
      </div>
    </div>
  );
}

/* Recommendation text by risk */
function Recommendation({ riskLevel, diseaseName }) {
  const recs = {
    Low:    `No immediate concern detected for ${diseaseName}. Maintain healthy lifestyle and schedule routine annual checkups.`,
    Medium: `Moderate risk indicators found for ${diseaseName}. Consult a physician for further evaluation and lifestyle adjustments.`,
    High:   `Elevated risk detected for ${diseaseName}. Immediate consultation with a specialist is strongly recommended.`,
  };
  return (
    <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="flex items-start gap-3">
        <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2} className="w-4 h-4 shrink-0 mt-0.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
        </svg>
        <p className="text-xs font-body text-slate-500 leading-relaxed">{recs[riskLevel]}</p>
      </div>
    </div>
  );
}

export default function ResultModal({ result, onClose, diseaseName, accentColor }) {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef(null);
  const cfg = RISK[result?.riskLevel] || RISK.Low;

  const probPct  = Math.round((result?.probability || 0) * 100);
  const accPct   = Math.round((result?.accuracy    || 0));

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    document.body.style.overflow = "hidden";
    return () => { clearTimeout(t); document.body.style.overflow = ""; };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 320);
  };

  return (
    <div
      ref={overlayRef}
      onClick={e => e.target === overlayRef.current && handleClose()}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "rgba(4,8,15,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        transition: "opacity 0.32s ease",
        opacity: visible ? 1 : 0,
      }}
    >
      {/* Radial glow behind modal */}
      <div className="absolute pointer-events-none transition-opacity duration-500"
        style={{ width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 65%)`,
          opacity: visible ? 1 : 0 }} />

      {/* Modal card */}
      <div
        className="relative w-full max-w-lg"
        style={{
          transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.96)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.32s ease",
        }}
      >
        <div className="rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(160deg, rgba(14,22,40,0.98) 0%, rgba(6,11,20,0.99) 100%)",
            border: `1px solid ${cfg.border}`,
            boxShadow: `0 0 80px ${cfg.glow}, 0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)`,
          }}>

          {/* Top shine line */}
          <div className="absolute top-0 left-8 right-8 h-px rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}55, transparent)` }} />

          {/* Header */}
          <div className="px-6 pt-5 pb-4 flex items-center justify-between"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: `linear-gradient(135deg, ${cfg.glow} 0%, transparent 50%)` }}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl" style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={cfg.color} strokeWidth={2} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-slate-600 mb-0.5">{diseaseName}</p>
                <h2 className="font-display text-base font-bold text-white">Diagnostic Complete</h2>
              </div>
            </div>
            <button onClick={handleClose}
              className="p-2 rounded-xl text-slate-500 hover:text-white transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-5">
            {/* Risk badge */}
            <div className="flex justify-center">
              <RiskBadge riskLevel={result?.riskLevel} cfg={cfg} />
            </div>

            {/* Charts row */}
            <div className="flex items-center justify-center gap-4">
              <RadialArc value={probPct} color={cfg.color} size={152} strokeWidth={11}
                label="Disease Probability" sublabel="risk score" />
              <div className="flex flex-col items-center gap-2">
                <div className="w-px h-28" style={{ background: "rgba(255,255,255,0.06)" }} />
                <div className="text-[9px] font-mono text-slate-700 tracking-widest uppercase">vs</div>
                <div className="w-px h-28" style={{ background: "rgba(255,255,255,0.06)" }} />
              </div>
              <RadialArc value={accPct} color="#818cf8" size={152} strokeWidth={11}
                label="Model Accuracy" sublabel="confidence" />
            </div>

            {/* Three stat pills */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Risk Level",   value: result?.riskLevel, color: cfg.color,    bg: cfg.bg,                    border: cfg.border },
                { label: "Probability",  value: `${probPct}%`,      color: cfg.color,    bg: cfg.bg,                    border: cfg.border },
                { label: "Accuracy",     value: `${accPct}%`,       color: "#818cf8",    bg: "rgba(129,140,248,0.08)",  border: "rgba(129,140,248,0.2)" },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-3 text-center"
                  style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                  <div className="font-display text-lg font-bold leading-none" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[9px] font-mono tracking-widest uppercase text-slate-600 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Recommendation */}
            <Recommendation riskLevel={result?.riskLevel} diseaseName={diseaseName} />

            {/* Disclaimer */}
            <p className="text-[10px] font-body text-slate-700 text-center leading-relaxed pt-1"
              style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              ⚕ AI-assisted only — Not a substitute for professional medical diagnosis
            </p>
          </div>

          {/* Footer */}
          <div className="px-6 pb-5">
            <button onClick={handleClose}
              className="w-full py-3.5 rounded-xl font-display font-bold text-sm tracking-wider text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.99]"
              style={{ background: `linear-gradient(135deg, ${cfg.color}cc 0%, ${cfg.color}77 100%)`, boxShadow: `0 4px 20px ${cfg.glow}` }}>
              Close Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
