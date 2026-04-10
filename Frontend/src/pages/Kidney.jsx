import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import InputField from "../components/InputField";
import ResultModal from "../components/ResultModal";
import { useDiseasePredict } from "../hooks/useDiseasePredict";
import BASE_URL from "../config";

const INITIAL = {
  age: "",
  bp: "",
  sg: "",
  al: "",
  su: "",
  rbc: "",
  pc: "",
  pcc: "",
  ba: "",
};
const FIELDS = [
  { name: "age", label: "Age", hint: "years", min: 1, max: 120 },
  { name: "bp", label: "Blood Pressure", hint: "mmHg", min: 50, max: 200 },
  { name: "sg", label: "Specific Gravity", hint: "1.005–1.025", step: 0.001 },
  { name: "al", label: "Albumin", hint: "0–5", min: 0, max: 5 },
  { name: "su", label: "Sugar", hint: "0–5", min: 0, max: 5 },

  { name: "rbc", label: "Red Blood Cells", hint: "1=Normal, 0=Abnormal", min: 0, max: 1 },
  { name: "pc", label: "Pus Cell", hint: "1=Normal, 0=Abnormal", min: 0, max: 1 },
  { name: "pcc", label: "Pus Cell Clumps", hint: "1=Present, 0=Not Present", min: 0, max: 1 },
  { name: "ba", label: "Bacteria", hint: "1=Present, 0=Not Present", min: 0, max: 1 },
];

const Icon = (
  <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" d="M12 6c-3 0-6 3-6 7.5 0 6 3 9 6 12 .75 1.1 1.5 1.5 2.25 1.5s1.5-.4 2.25-1.5c3-3 6-6 6-12C22.5 9 19.5 6 16.5 6" strokeOpacity="0.8"/>
    <circle cx="13" cy="13" r="1.5" strokeOpacity="0.5"/>
    <circle cx="19" cy="18" r="1.5" strokeOpacity="0.5"/>
    <path strokeLinecap="round" d="M13 13 Q16 15 19 18" strokeOpacity="0.25" strokeDasharray="2 2"/>
  </svg>
);

function SectionLabel({ text, className = "" }) {
  return (
    <div className={`flex items-center gap-3 col-span-2 my-2 ${className}`}>
      <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
      <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-slate-700">{text}</span>
      <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
    </div>
  );
}

export default function Kidney() {
  const [form, setForm] = useState(INITIAL);
  const { accuracy, loadingAcc, result, loading, error, showModal, setShowModal, predict } = useDiseasePredict("kidney");

const handleChange = (e) => {
  setForm(p => ({ ...p, [e.target.name]: e.target.value }));
};

const handleSubmit = () => {
  const payload = {
    age: Number(form.age),
    bp: Number(form.bp),
    sg: Number(form.sg),
    al: Number(form.al),
    su: Number(form.su),
    rbc: Number(form.rbc),
    pc: Number(form.pc),
    pcc: Number(form.pcc),
    ba: Number(form.ba),
  };

  predict(payload);
};
  const isValid = Object.values(form).every(v => v !== "");
  const filled  = Object.values(form).filter(v => v !== "").length;

  return (
    <PageLayout title="Kidney Disease Prediction" subtitle="Evaluate renal function markers for chronic kidney disease."
      accentColor="violet" icon={Icon} accuracy={accuracy} loadingAcc={loadingAcc}>

      <div className="rounded-2xl animate-fade-up-2 opacity-0-init"
        style={{ background: "linear-gradient(145deg,rgba(14,22,40,0.92),rgba(8,14,26,0.97))", border: "1px solid rgba(255,255,255,0.05)" }}>

        <div className="px-6 pt-5 pb-4 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div>
            <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-slate-600">Renal Parameters</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-1 rounded-full overflow-hidden" style={{ width: 80, background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${(filled / FIELDS.length) * 100}%`, background: "#a78bfa", boxShadow: "0 0 6px #a78bfa88" }} />
              </div>
              <span className="text-[10px] font-mono text-slate-600">{filled}/{FIELDS.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
            style={{ background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.12)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth={2} className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.7-1.31 2.31l-1.64-.41"/>
            </svg>
            <span className="text-[10px] font-mono text-violet-400">Renal Panel</span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <SectionLabel text="Baseline & Urinalysis" className="mt-3"  />
            {FIELDS.slice(0, 5).map(f => <InputField key={f.name} {...f} type="number" value={form[f.name]} onChange={handleChange} />)}
            <SectionLabel text="Biochemical Markers" className="mt-3"  />
            {FIELDS.slice(5, 10).map(f => <InputField key={f.name} {...f} type="number" value={form[f.name]} onChange={handleChange} />)}
            <SectionLabel text="Hematological Indices" className="mt-3" />
            {FIELDS.slice(10).map(f => <InputField key={f.name} {...f} type="number" value={form[f.name]} onChange={handleChange} />)}
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
              style={{ background: "linear-gradient(135deg,#7c3aed 0%,#2563eb 100%)", boxShadow: isValid ? "0 8px 24px rgba(124,58,237,0.2)" : "none" }}>
              {loading
                ? <span className="flex items-center justify-center gap-3"><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/><path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Analyzing…</span>
                : <span className="flex items-center justify-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
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

      {showModal && result && <ResultModal result={result} onClose={() => setShowModal(false)} diseaseName="Kidney Disease" accentColor="violet"/>}
    </PageLayout>
  );
}
