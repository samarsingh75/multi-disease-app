import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import InputField from "../components/InputField";
import ResultModal from "../components/ResultModal";
import { useDiseasePredict } from "../hooks/useDiseasePredict";
import BASE_URL from "../config";

/* ── ALL FIELDS & KEYS UNCHANGED ── */
const INITIAL = {
  Gender: "",
  mmse: "",
  ageAtEntry: "",
  cdr: "",
  memory: "",
};

const FIELDS = [
  { name: "Gender", label: "Gender", hint: "1=Male, 0=Female", min: 0, max: 1 },
  { name: "ageAtEntry", label: "Age", hint: "years", min: 50, max: 100 },
  { name: "mmse", label: "Mini-Mental State Exam", hint: "0–30", min: 0, max: 30 },
  { name: "cdr", label: "Clinical Dementia Rating", hint: "0, 0.5, 1, 2", step: 0.5 },
  { name: "memory", label: "Memory Score", hint: "0–1", step: 0.01 },
];

const Icon = (
  <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" d="M16 5c-5.5 0-9.5 3.5-9.5 8 0 2.8 1.3 5 3.5 6.5v5H22v-5c2.2-1.5 3.5-3.7 3.5-6.5C25.5 8.5 21.5 5 16 5z" strokeOpacity="0.8"/>
    <path strokeLinecap="round" d="M12 15c.7-1.3 2-2 4-2s3.3.7 4 2" strokeOpacity="0.5"/>
    <path strokeLinecap="round" d="M14 24.5v-3.5M18 24.5v-3.5" strokeOpacity="0.35"/>
    <circle cx="12" cy="10" r="1" fill="currentColor" opacity="0.4"/>
    <circle cx="20" cy="9"  r="1" fill="currentColor" opacity="0.4"/>
    <circle cx="22" cy="16" r="1" fill="currentColor" opacity="0.3"/>
  </svg>
);

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 col-span-2">
      <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
      <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-slate-700">{text}</span>
      <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
    </div>
  );
}

/* Animated MMSE scale visualization */
function MMSEIndicator({ value }) {
  const pct = value ? Math.min(Math.max(parseFloat(value), 0), 30) / 30 * 100 : 0;
  const color = pct > 80 ? "#10b981" : pct > 50 ? "#f59e0b" : "#ef4444";
  return (
    <div className="col-span-2 rounded-xl p-3 flex items-center gap-4"
      style={{ background: "rgba(251,191,36,0.03)", border: "1px solid rgba(251,191,36,0.08)" }}>
      <span className="text-[10px] font-mono text-slate-700 tracking-widest uppercase whitespace-nowrap">MMSE Level</span>
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}66` }} />
      </div>
      <span className="text-[10px] font-mono tabular-nums" style={{ color }}>
        {value ? `${value}/30` : "—"}
      </span>
    </div>
  );
}

export default function Alzheimer() {
  const [form, setForm] = useState(INITIAL);
  const { accuracy, loadingAcc, result, loading, error, showModal, setShowModal, predict } = useDiseasePredict("alzheimer");

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = () => {
const payload = {
  Gender: Number(form.Gender),
  mmse: Number(form.mmse),
  ageAtEntry: Number(form.ageAtEntry),
  cdr: Number(form.cdr),
  memory: Number(form.memory),
};
    predict(payload);
  };
  const isValid = Object.values(form).every(v => v !== "");
  const filled  = Object.values(form).filter(v => v !== "").length;

  return (
    <PageLayout title="Alzheimer's Prediction" subtitle="Screen cognitive & neurological biomarkers for early detection."
      accentColor="amber" icon={Icon} accuracy={accuracy} loadingAcc={loadingAcc}>

      <div className="rounded-2xl animate-fade-up-2 opacity-0-init"
        style={{ background: "linear-gradient(145deg,rgba(14,22,40,0.92),rgba(8,14,26,0.97))", border: "1px solid rgba(255,255,255,0.05)" }}>

        <div className="px-6 pt-5 pb-4 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div>
            <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-slate-600">Neurological Parameters</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-1 rounded-full overflow-hidden" style={{ width: 80, background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${(filled / FIELDS.length) * 100}%`, background: "#fbbf24", boxShadow: "0 0 6px #fbbf2488" }} />
              </div>
              <span className="text-[10px] font-mono text-slate-600">{filled}/{FIELDS.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.12)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth={2} className="w-3 h-3 animate-brain-pulse">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.7-1.31 2.31l-1.64-.41"/>
            </svg>
            <span className="text-[10px] font-mono text-amber-400">Neural Panel</span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SectionLabel text="Demographic & Cognitive Scores" />
            {FIELDS.slice(0, 4).map(f => <InputField key={f.name} {...f} type="number" value={form[f.name]} onChange={handleChange} />)}
            <MMSEIndicator value={form.mmse} />
            <SectionLabel text="Neuroimaging Markers" />
            {FIELDS.slice(4).map(f => <InputField key={f.name} {...f} type="number" value={form[f.name]} onChange={handleChange} />)}
          </div>

          {error && (
            <div className="mt-5 rounded-xl px-4 py-3.5 flex items-start gap-3"
              style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2} className="w-4 h-4 shrink-0 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
              </svg>
              <p className="text-xs font-body text-red-400/70">{error}</p>
            </div>
          )}

          <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <button onClick={handleSubmit} disabled={!isValid || loading}
              className="w-full py-4 rounded-xl font-display font-bold text-sm tracking-wider text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0"
              style={{ background: "linear-gradient(135deg,#d97706 0%,#dc2626 100%)", boxShadow: isValid ? "0 8px 24px rgba(217,119,6,0.2)" : "none" }}>
              {loading
                ? <span className="flex items-center justify-center gap-3"><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/><path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Analyzing…</span>
                : <span className="flex items-center justify-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 animate-brain-pulse">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.7-1.31 2.31l-1.64-.41"/>
                    </svg>
                    Run Prediction
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                    </svg>
                  </span>}
            </button>
          </div>
        </div>
      </div>

      {showModal && result && <ResultModal result={result} onClose={() => setShowModal(false)} diseaseName="Alzheimer's" accentColor="amber"/>}
    </PageLayout>
  );
}
