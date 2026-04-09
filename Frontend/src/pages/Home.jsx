import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config";

/* ─── Animated ECG for Heart card ─── */
function ECGAnimation() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden opacity-30 pointer-events-none">
      <svg viewBox="0 0 400 40" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="ecgGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fb7185" stopOpacity="0" />
            <stop offset="40%" stopColor="#fb7185" stopOpacity="1" />
            <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,20 L30,20 L40,20 L45,5 L50,35 L55,5 L60,20 L75,20 L80,18 L82,22 L84,20 L110,20 L115,20 L120,5 L125,35 L130,5 L135,20 L150,20 L155,18 L157,22 L159,20 L185,20 L190,20 L195,5 L200,35 L205,5 L210,20 L225,20 L230,18 L232,22 L234,20 L260,20 L265,20 L270,5 L275,35 L280,5 L285,20 L300,20 L305,18 L307,22 L309,20 L335,20 L340,20 L345,5 L350,35 L355,5 L360,20 L375,20 L380,18 L382,22 L384,20 L400,20"
          fill="none"
          stroke="url(#ecgGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 800,
            strokeDashoffset: 800,
            animation: "ecg-scroll 3s linear infinite",
          }}
        />
      </svg>
    </div>
  );
}

/* ─── Floating glucose molecule for Diabetes ─── */
function GlucoseMolecule() {
  return (
    <div className="absolute top-6 right-20 opacity-40 pointer-events-none animate-rotate-slow">
      <svg viewBox="0 0 60 60" width="60" height="60" fill="none">
        <circle cx="30" cy="10" r="5" stroke="#22d3ee" strokeWidth="1.5"/>
        <circle cx="50" cy="22" r="5" stroke="#22d3ee" strokeWidth="1.5"/>
        <circle cx="50" cy="42" r="5" stroke="#22d3ee" strokeWidth="1.5"/>
        <circle cx="30" cy="54" r="5" stroke="#22d3ee" strokeWidth="1.5"/>
        <circle cx="10" cy="42" r="5" stroke="#22d3ee" strokeWidth="1.5"/>
        <circle cx="10" cy="22" r="5" stroke="#22d3ee" strokeWidth="1.5"/>
        <circle cx="30" cy="30" r="4" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.5"/>
        <line x1="30" y1="15" x2="30" y2="26" stroke="#22d3ee" strokeWidth="1"/>
        <line x1="45" y1="25" x2="34" y2="28" stroke="#22d3ee" strokeWidth="1"/>
        <line x1="45" y1="39" x2="34" y2="32" stroke="#22d3ee" strokeWidth="1"/>
        <line x1="30" y1="49" x2="30" y2="34" stroke="#22d3ee" strokeWidth="1"/>
        <line x1="15" y1="39" x2="26" y2="32" stroke="#22d3ee" strokeWidth="1"/>
        <line x1="15" y1="25" x2="26" y2="28" stroke="#22d3ee" strokeWidth="1"/>
      </svg>
    </div>
  );
}

/* ─── DNA helix for Kidney ─── */
function DNAHelix() {
  const nodes = [0,1,2,3,4,5,6,7];
  return (
    <div className="absolute top-2 right-20 opacity-0 pointer-events-none">
      <svg viewBox="0 0 40 80" width="40" height="80" fill="none">
        {nodes.map((i) => {
          const y = 8 + i * 9;
          const x1 = 8 + Math.sin(i * 0.9) * 12;
          const x2 = 32 - Math.sin(i * 0.9) * 12;
          return (
            <g key={i}>
              <circle cx={x1} cy={y} r="3" fill="#a78bfa" opacity={0.6 + Math.sin(i) * 0.3} />
              <circle cx={x2} cy={y} r="3" fill="#a78bfa" opacity={0.6 - Math.sin(i) * 0.3} />
              <line x1={x1} y1={y} x2={x2} y2={y} stroke="#a78bfa" strokeWidth="1" opacity="0.3" strokeDasharray="2 2"/>
            </g>
          );
        })}
        {nodes.slice(0,-1).map((i) => {
          const y1 = 8 + i * 9;
          const y2 = 8 + (i+1) * 9;
          const x1a = 8 + Math.sin(i * 0.9) * 12;
          const x1b = 8 + Math.sin((i+1) * 0.9) * 12;
          const x2a = 32 - Math.sin(i * 0.9) * 12;
          const x2b = 32 - Math.sin((i+1) * 0.9) * 12;
          return (
            <g key={`l${i}`}>
              <line x1={x1a} y1={y1} x2={x1b} y2={y2} stroke="#a78bfa" strokeWidth="1.5" opacity="0.5"/>
              <line x1={x2a} y1={y1} x2={x2b} y2={y2} stroke="#a78bfa" strokeWidth="1.5" opacity="0.5"/>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ─── Neural network for Alzheimer ─── */
function NeuralNet() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % 6), 600);
    return () => clearInterval(t);
  }, []);
  const nodes = [
    {x:8,y:20},{x:8,y:40},{x:8,y:60},
    {x:32,y:12},{x:32,y:34},{x:32,y:56},
    {x:56,y:30},{x:56,y:50},
  ];
  const edges = [
    [0,3],[0,4],[1,3],[1,4],[1,5],[2,4],[2,5],[3,6],[3,7],[4,6],[4,7],[5,7]
  ];
  return (
    <div className="absolute top-2 right-20 opacity-50 pointer-events-none">
      <svg viewBox="0 0 64 72" width="64" height="72" fill="none">
        {edges.map(([a,b],i) => (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke="#fbbf24" strokeWidth="0.8"
            opacity={active === i % 6 ? 0.8 : 0.25}
            style={{ transition: "opacity 0.3s" }}
          />
        ))}
        {nodes.map((n,i) => (
          <circle key={i} cx={n.x} cy={n.y} r={active === i % 6 ? 4 : 2.5}
            fill="#fbbf24"
            opacity={active === i % 6 ? 0.9 : 0.4}
            style={{ transition: "all 0.3s" }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ─── Radial accuracy ring ─── */
function AccuracyRing({ value, color, size = 60 }) {
  const [anim, setAnim] = useState(0);
  const sw = 4, r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  useEffect(() => {
    if (!value) return;
    let raf, start = null;
    const dur = 1200, ease = t => 1 - Math.pow(1-t, 3);
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setAnim(ease(p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  const offset = circ * (1 - anim * (value || 0) / 100);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={sw}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${color}66)` }}/>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-bold leading-none" style={{ color, fontSize: size * 0.2 }}>
          {value ? `${Math.round(anim * value)}%` : "—"}
        </span>
      </div>
    </div>
  );
}

/* ─── Stat ticker ─── */
function StatTicker({ value, suffix="" }) {
  const [disp, setDisp] = useState(0);
  useEffect(() => {
    if (!value) return;
    let raf, start = null;
    const ease = t => 1 - Math.pow(1-t, 3);
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1500, 1);
      setDisp(Math.round(ease(p) * value));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span>{disp}{suffix}</span>;
}

const DISEASES = [
  {
    id: "diabetes", title: "Diabetes", route: "/diabetes", tag: "Metabolic",
    description: "Evaluate insulin resistance and blood glucose markers for type-2 diabetes risk.",
    color: { hex: "#22d3ee", glow: "rgba(34,211,238,0.12)", border: "rgba(34,211,238,0.15)", accent: "#22d3ee", cls: "text-cyan-400", badgeBg: "rgba(34,211,238,0.08)" },
    stat: "422M+", statLabel: "worldwide",
    BgDecor: GlucoseMolecule,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9" stroke="currentColor" strokeWidth={1.4}>
        <circle cx="20" cy="20" r="14" strokeOpacity="0.25"/>
        <circle cx="20" cy="20" r="7" strokeOpacity="0.7"/>
        <path strokeLinecap="round" d="M20 10v4M20 26v4M10 20h4M26 20h4" strokeOpacity="0.9"/>
        <circle cx="20" cy="20" r="2.5" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
  },
  {
    id: "heart", title: "Heart Disease", route: "/heart", tag: "Cardiovascular",
    description: "Analyze cardiovascular biomarkers and lifestyle factors for coronary artery disease.",
    color: { hex: "#fb7185", glow: "rgba(251,113,133,0.12)", border: "rgba(251,113,133,0.15)", accent: "#fb7185", cls: "text-rose-400", badgeBg: "rgba(251,113,133,0.08)" },
    stat: "17.9M", statLabel: "deaths/yr",
    BgDecor: () => null,
    hasECG: true,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 33s-12-8-12-17A8 8 0 0120 11a8 8 0 0112 5c0 9-12 17-12 17z" strokeOpacity="0.8"/>
        <path strokeLinecap="round" d="M11 22h4l2-5 3 10 2.5-6 1.5 2H29" strokeOpacity="0.7"/>
      </svg>
    ),
  },
  {
    id: "kidney", title: "Kidney Disease", route: "/kidney", tag: "Renal",
    description: "Detect early chronic kidney disease through renal function biomarker analysis.",
    color: { hex: "#a78bfa", glow: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.15)", accent: "#a78bfa", cls: "text-violet-400", badgeBg: "rgba(167,139,250,0.08)" },
    stat: "850M+", statLabel: "affected",
    BgDecor: DNAHelix,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" d="M15 7c-3.5 0-7 3.5-7 9 0 7 3.5 10.5 7 14 .9 1.3 1.8 1.8 2.5 1.8s1.6-.5 2.5-1.8c3.5-3.5 7-7 7-14 0-5.5-3.5-9-7-9" strokeOpacity="0.8"/>
        <circle cx="16" cy="17" r="2" strokeOpacity="0.5"/>
        <circle cx="24" cy="22" r="2" strokeOpacity="0.5"/>
        <path strokeLinecap="round" d="M16 17c2 1.5 4 3 8 5" strokeOpacity="0.3" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    id: "alzheimer", title: "Alzheimer's", route: "/alzheimer", tag: "Neurological",
    description: "Screen cognitive and neurological indicators for early Alzheimer's detection.",
    color: { hex: "#fbbf24", glow: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.15)", accent: "#fbbf24", cls: "text-amber-400", badgeBg: "rgba(251,191,36,0.08)" },
    stat: "55M+", statLabel: "w/ dementia",
    BgDecor: NeuralNet,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" d="M20 5c-7 0-12 4.5-12 10 0 3.5 1.8 6.3 4.5 8.2v6.8H27.5v-6.8C30.2 21.3 32 18.5 32 15c0-5.5-5-10-12-10z" strokeOpacity="0.8"/>
        <path strokeLinecap="round" d="M15 18c.8-1.5 2.5-2.5 5-2.5s4.2.9 5 2.5" strokeOpacity="0.5"/>
        <path strokeLinecap="round" d="M17.5 30.5V27M22.5 30.5V27" strokeOpacity="0.35"/>
        <circle cx="15" cy="12" r="1.5" fill="currentColor" opacity="0.3"/>
        <circle cx="25" cy="10" r="1.5" fill="currentColor" opacity="0.3"/>
        <circle cx="27" cy="18" r="1.5" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
  },
];

/* ─── Scrolling vitals bar ─── */
function VitalsBar() {
  const vitals = ["HR 72 bpm", "SpO₂ 98%", "BP 120/80", "Temp 98.6°F", "RR 16/min", "GFR 95", "HbA1c 5.4%", "LDL 100 mg/dL"];
  return (
    <div className="overflow-hidden border-t border-b border-white/[0.04] py-2 mb-12">
      <div className="flex gap-10 items-center" style={{ animation: "ecg-scroll 0s linear", whiteSpace: "nowrap" }}>
        <div className="flex gap-10 animate-[shimmer-x_20s_linear_infinite]" style={{ minWidth: "200%", animation: "none" }}>
          <marquee className="text-[10px] font-mono tracking-widest text-slate-600" scrollamount="3">
            {vitals.join("   ·   ")}   ·   {vitals.join("   ·   ")}
          </marquee>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [accuracies, setAccuracies] = useState({});
  const [loadingAcc, setLoadingAcc] = useState(true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    Promise.allSettled(
      DISEASES.map(d => axios.get(`${BASE_URL}/model-info/${d.id}`).then(r => ({ id: d.id, val: Math.round(r.data.accuracy) })))
    ).then(results => {
      const map = {};
      results.forEach(r => { if (r.status === "fulfilled") map[r.value.id] = r.value.val; });
      setAccuracies(map);
      setLoadingAcc(false);
    });
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const avgAcc = Object.values(accuracies).length
    ? Math.round(Object.values(accuracies).reduce((a,b) => a+b, 0) / Object.values(accuracies).length)
    : null;

  return (
    <div className="min-h-screen bg-[#04080f] relative overflow-hidden noise-overlay">
      {/* Hex grid background */}
      <div className="absolute inset-0 hex-bg opacity-100 pointer-events-none" />

      {/* Radial ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.06) 0%, rgba(79,70,229,0.04) 40%, transparent 50%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 50%)" }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.03) 0%, transparent 50%)" }} />

      {/* Top nav bar */}
      <div className="relative z-10 border-b border-white/[0.04]" style={{ background: "rgba(4,8,15,0.8)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Cross icon */}
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div className="absolute w-full h-[2px] rounded bg-gradient-to-r from-cyan-400 to-indigo-400" />
              <div className="absolute h-full w-[2px] rounded bg-gradient-to-b from-cyan-400 to-indigo-400" />
              <div className="absolute inset-0 rounded-full" style={{ background: "rgba(34,211,238,0.08)" }} />
            </div>
            <span className="font-display text-sm font-bold text-white tracking-wide">MedPredict<span className="gradient-text">.AI</span></span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400 live-dot" />
              <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase">Systems Online</span>
            </div>
            <span className="text-[10px] font-mono text-slate-600 tabular-nums">
              {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        {/* Scrolling vitals ticker */}
        <div className="overflow-hidden border border-white/[0.04] rounded-xl py-2 mb-10 px-4"
          style={{ background: "rgba(4,8,15,0.6)" }}>
          <marquee className="text-[10px] font-mono tracking-[0.2em] text-slate-600" scrollamount="4">
            ● HR 72 bpm &nbsp;&nbsp; ● SpO₂ 98% &nbsp;&nbsp; ● BP 120/80 mmHg &nbsp;&nbsp; ● Temp 98.6°F &nbsp;&nbsp; ● RR 16/min &nbsp;&nbsp; ● GFR 95 mL/min &nbsp;&nbsp; ● HbA1c 5.4% &nbsp;&nbsp; ● LDL 100 mg/dL &nbsp;&nbsp; ● eGFR 90+ &nbsp;&nbsp; ● Creatinine 1.1 mg/dL &nbsp;&nbsp; ● MMSE Score 28/30 &nbsp;&nbsp; ● Serum Glucose 95 mg/dL &nbsp;&nbsp;
          </marquee>
        </div>

        {/* Hero section */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-6 animate-fade-up opacity-0-init"
            style={{ borderColor: "rgba(34,211,238,0.2)", background: "rgba(34,211,238,0.04)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-cyan-400">Clinical AI Diagnostic Platform v2.0</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight leading-none animate-fade-up-1 opacity-0-init">
            Multi-Disease<br />
            <span className="gradient-text">Prediction</span>
            <span className="text-white"> System</span>
          </h1>

          <p className="text-slate-400 font-body text-base max-w-lg mx-auto animate-fade-up-2 opacity-0-init leading-relaxed mb-8">
            Advanced ensemble ML models trained on validated clinical datasets.<br/>Early risk stratification across 4 major disease categories.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-8 animate-fade-up-3 opacity-0-init">
            {[
              { val: 4, suffix: "", label: "Disease Models",    color: "#22d3ee" },
              { val: avgAcc, suffix: "%", label: "Avg Model Accuracy", color: "#818cf8" },
              { val: 100, suffix: "ms", label: "Inference Speed",    color: "#34d399" },
              { val: 99,  suffix: "%",  label: "System Uptime",      color: "#fbbf24" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-display text-2xl font-bold" style={{ color: s.color }}>
                  {s.val ? <StatTicker value={s.val} suffix={s.suffix} /> : <span className="opacity-40">—</span>}
                </div>
                <div className="text-[10px] font-mono text-slate-600 tracking-widest uppercase mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Disease Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-up-4 opacity-0-init">
          {DISEASES.map(d => (
            <DiseaseCard key={d.id} disease={d} accuracy={accuracies[d.id]} loadingAcc={loadingAcc}
              onClick={() => navigate(d.route)} />
          ))}
        </div>

        {/* Bottom disclaimer */}
        <div className="flex items-center justify-center gap-3 mt-12">
          <div className="h-px flex-1 max-w-xs" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06))" }} />
          <p className="text-[10px] font-mono text-slate-700 tracking-[0.15em] uppercase">
            For Research & Educational Purposes · Not a Substitute for Medical Advice
          </p>
          <div className="h-px flex-1 max-w-xs" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.06), transparent)" }} />
        </div>
      </div>
    </div>
  );
}

function DiseaseCard({ disease: d, accuracy, loadingAcc, onClick }) {
  const [hovered, setHovered] = useState(false);
  const { BgDecor, hasECG } = d;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group text-left w-full card-hover relative overflow-hidden rounded-2xl"
      style={{
        background: "linear-gradient(145deg, rgba(14,22,40,0.98) 0%, rgba(8,14,26,0.98) 100%)",
        border: `1px solid ${hovered ? d.color.border : "rgba(255,255,255,0.05)"}`,
        boxShadow: hovered ? `0 20px 60px ${d.color.glow}, 0 0 0 1px ${d.color.border}` : "0 4px 20px rgba(0,0,0,0.3)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.35s cubic-bezier(0.34,1.4,0.64,1)",
      }}
    >
      {/* Ambient top glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${d.color.hex}66, transparent)`, opacity: hovered ? 1 : 0 }} />

      {/* Corner radial glow */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-400"
        style={{ background: `radial-gradient(ellipse at 10% 10%, ${d.color.glow} 0%, transparent 55%)`, opacity: hovered ? 1 : 0 }} />

      {/* BG Decor */}
      <BgDecor />

      {/* ECG animation for heart */}
      {hasECG && <ECGAnimation />}

      {/* Scan line on hover */}
      {hovered && (
        <div className="absolute inset-x-0 h-16 pointer-events-none opacity-[0.03] animate-scan-line"
          style={{ background: `linear-gradient(180deg, transparent, ${d.color.hex}, transparent)` }} />
      )}

      <div className="relative z-10 p-6">
        {/* Top row */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            {/* Icon container */}
            <div className="relative p-3 rounded-2xl flex items-center justify-center"
              style={{ background: d.color.badgeBg, border: `1px solid ${d.color.border}`, color: d.color.hex }}>
              {/* Pulse ring on heart icon */}
              {d.id === "heart" && (
                <div className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ border: `1px solid ${d.color.hex}`, animation: "pulse-ring 1.8s ease-out infinite", opacity: 0.4 }} />
              )}
              <div className={d.id === "heart" ? "animate-heartbeat" : d.id === "alzheimer" ? "animate-brain-pulse" : ""}>
                {d.icon}
              </div>
            </div>
            <div>
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase mb-1 block"
                style={{ color: d.color.hex, opacity: 0.7 }}>{d.tag}</span>
              <h2 className="font-display text-xl font-bold text-white leading-tight">{d.title}</h2>
            </div>
          </div>

          {/* Accuracy ring */}
          <div className="flex flex-col items-center gap-1">
            {loadingAcc
              ? <div className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-5 h-5 rounded-full border-[1.5px] border-t-current animate-spin"
                    style={{ borderColor: `${d.color.hex}33`, borderTopColor: d.color.hex }} />
                </div>
              : <AccuracyRing value={accuracy} color={d.color.hex} size={58} />}
            <span className="text-[8px] font-mono tracking-widest uppercase" style={{ color: "rgba(148,163,184,0.4)" }}>accuracy</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm font-body text-slate-500 leading-relaxed mb-5 pr-4">{d.description}</p>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: d.color.hex }} />
            <span className="font-display text-sm font-bold" style={{ color: d.color.hex }}>{d.stat}</span>
            <span className="text-[10px] font-mono text-slate-600">{d.statLabel}</span>
          </div>
          <div className="flex items-center gap-2 transition-all duration-300"
            style={{ color: d.color.hex, opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(-6px)" }}>
            <span className="text-[10px] font-mono tracking-widest uppercase">Analyze</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-6 right-6 h-px transition-all duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${d.color.hex}44, transparent)`, opacity: hovered ? 1 : 0 }} />
    </button>
  );
}
