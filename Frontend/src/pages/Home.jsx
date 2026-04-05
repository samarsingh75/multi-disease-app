import React from "react";
import { useNavigate } from "react-router-dom";

const diseases = [
  {
    id: "diabetes",
    title: "Diabetes",
    route: "/diabetes",
    description: "Assess insulin resistance and blood glucose markers to evaluate type-2 diabetes risk.",
    tag: "Metabolic",
    color: {
      from: "#0891b2",
      to: "#0e7490",
      glow: "rgba(8,145,178,0.2)",
      accent: "text-cyan-400",
      border: "border-cyan-500/20",
      badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      dot: "bg-cyan-400",
    },
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="24" cy="24" r="18" strokeOpacity="0.3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M24 14v4M24 30v4M14 24h4M30 24h4" />
        <circle cx="24" cy="24" r="6" strokeOpacity="0.8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 24h6M24 21v6" strokeOpacity="0.5" />
      </svg>
    ),
    stat: "422M+",
    statLabel: "worldwide cases",
  },
  {
    id: "heart",
    title: "Heart Disease",
    route: "/heart",
    description: "Analyze cardiovascular biomarkers and lifestyle factors for coronary artery disease risk.",
    tag: "Cardiovascular",
    color: {
      from: "#e11d48",
      to: "#be123c",
      glow: "rgba(225,29,72,0.2)",
      accent: "text-rose-400",
      border: "border-rose-500/20",
      badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      dot: "bg-rose-400",
    },
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M24 38s-14-9.333-14-19A9 9 0 0124 13.4 9 9 0 0138 19c0 9.667-14 19-14 19z" strokeOpacity="0.8" />
        <path strokeLinecap="round" d="M16 25h4l2-6 4 12 3-8 2 2h3" strokeOpacity="0.5" />
      </svg>
    ),
    stat: "17.9M+",
    statLabel: "annual deaths",
  },
  {
    id: "kidney",
    title: "Kidney Disease",
    route: "/kidney",
    description: "Evaluate renal function indicators and detect early-stage chronic kidney disease patterns.",
    tag: "Renal",
    color: {
      from: "#7c3aed",
      to: "#6d28d9",
      glow: "rgba(124,58,237,0.2)",
      accent: "text-violet-400",
      border: "border-violet-500/20",
      badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
      dot: "bg-violet-400",
    },
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 10c-4 0-8 4-8 10 0 8 4 12 8 16 1 1.5 2 2 3 2s2-.5 3-2c4-4 8-8 8-16 0-6-4-10-8-10" strokeOpacity="0.8" />
        <circle cx="20" cy="20" r="2" strokeOpacity="0.5" />
        <circle cx="28" cy="26" r="2" strokeOpacity="0.5" />
      </svg>
    ),
    stat: "850M+",
    statLabel: "affected globally",
  },
  {
    id: "alzheimer",
    title: "Alzheimer's",
    route: "/alzheimer",
    description: "Screen neurological and cognitive indicators for early Alzheimer's disease detection.",
    tag: "Neurological",
    color: {
      from: "#d97706",
      to: "#b45309",
      glow: "rgba(217,119,6,0.2)",
      accent: "text-amber-400",
      border: "border-amber-500/20",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      dot: "bg-amber-400",
    },
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M24 8c-8 0-14 5-14 12 0 4 2 7 5 9v7h18v-7c3-2 5-5 5-9 0-7-6-12-14-12z" strokeOpacity="0.8" />
        <path strokeLinecap="round" d="M18 22c1-2 3-3 6-3s5 1 6 3" strokeOpacity="0.5" />
        <path strokeLinecap="round" d="M21 36v-5M27 36v-5" strokeOpacity="0.4" />
      </svg>
    ),
    stat: "55M+",
    statLabel: "living with dementia",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#060b14] relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent blur-3xl" />

      {/* Bottom corner glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-500/5 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          {/* System badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8 animate-fade-up opacity-0-init">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono tracking-widest uppercase text-cyan-400">
              AI-Powered Diagnostic System v2.0
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight animate-fade-up-1 opacity-0-init">
            Multi-Disease{" "}
            <span className="gradient-text">Prediction</span>
          </h1>

          <p className="text-slate-400 font-body text-lg max-w-xl mx-auto animate-fade-up-2 opacity-0-init leading-relaxed">
            Advanced machine learning models trained on clinical datasets to assist in early disease risk assessment.
          </p>

          {/* Stats bar */}
          <div className="flex items-center justify-center gap-8 mt-10 animate-fade-up-3 opacity-0-init">
            {[
              { val: "4", label: "Disease Models" },
              { val: "95%+", label: "Avg Accuracy" },
              { val: "<100ms", label: "Inference Time" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-xl font-bold text-white">{s.val}</div>
                <div className="text-xs font-mono text-slate-500 tracking-wider uppercase mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Disease Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-up-4 opacity-0-init">
          {diseases.map((d, i) => (
            <DiseaseCard key={d.id} disease={d} delay={i * 80} onClick={() => navigate(d.route)} />
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs font-mono text-slate-600 mt-12 tracking-wider">
          FOR RESEARCH AND EDUCATIONAL PURPOSES ONLY — NOT A SUBSTITUTE FOR MEDICAL ADVICE
        </p>
      </div>
    </div>
  );
}

function DiseaseCard({ disease: d, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group text-left w-full glass rounded-2xl p-6 card-hover glow-on-hover relative overflow-hidden border border-white/[0.06] hover:border-opacity-40 transition-all duration-300"
      style={{
        "--hover-border": d.color.from,
      }}
    >
      {/* Hover gradient fill */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at top left, ${d.color.glow} 0%, transparent 60%)`,
        }}
      />

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at top right, ${d.color.glow}, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Top row */}
        <div className="flex items-start justify-between mb-5">
          <div
            className={`p-3 rounded-xl border ${d.color.border} ${d.color.badge.split(" ")[0]} ${d.color.accent}`}
            style={{ background: `${d.color.glow}` }}
          >
            {d.icon}
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${d.color.badge}`}>
              {d.tag}
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className={`w-4 h-4 ${d.color.accent} opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300 -translate-x-1`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>

        {/* Title & Description */}
        <h2 className="font-display text-xl font-bold text-white mb-2 group-hover:text-opacity-100">
          {d.title}
        </h2>
        <p className="text-sm font-body text-slate-400 leading-relaxed mb-5">
          {d.description}
        </p>

        {/* Bottom stat */}
        <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06]">
          <div className={`w-1 h-1 rounded-full ${d.color.dot}`} />
          <span className={`font-display text-sm font-bold ${d.color.accent}`}>{d.stat}</span>
          <span className="text-xs font-mono text-slate-500">{d.statLabel}</span>
        </div>
      </div>
    </button>
  );
}
