import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import InputField from "../components/InputField";
import ResultModal from "../components/ResultModal";
import { useDiseasePredict } from "../hooks/useDiseasePredict";
import BASE_URL from "../config";

/* ── ALL FIELDS & KEYS UNCHANGED ── */

const INITIAL = {
  pregnancies: "",
  glucose: "",
  blood_pressure: "",
  skin_thickness: "",
  insulin: "",
  bmi: "",
  diabetes_pedigree_function: "",
  age: "",
};

const FIELDS = [
  { name: "pregnancies", label: "Pregnancies", placeholder: "0", hint: "count", min: 0, max: 20 },
  { name: "glucose", label: "Glucose", placeholder: "120", hint: "mg/dL", min: 0, max: 300 },
  { name: "blood_pressure", label: "Blood Pressure", placeholder: "70", hint: "mmHg", min: 0, max: 200 },
  { name: "skin_thickness", label: "Skin Thickness", placeholder: "20", hint: "mm", min: 0, max: 100 },
  { name: "insulin", label: "Insulin", placeholder: "80", hint: "μU/mL", min: 0, max: 900 },
  { name: "bmi", label: "BMI", placeholder: "25.0", hint: "kg/m²", min: 0, max: 70, step: 0.1 },
  {
    name: "diabetes_pedigree_function",
    label: "Diabetes Pedigree Function",
    placeholder: "0.5",
    hint: "score",
    min: 0,
    max: 3,
    step: 0.001,
  },
  { name: "age", label: "Age", placeholder: "35", hint: "years", min: 1, max: 120 },
];

const Icon = (
  <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="16" cy="16" r="12" strokeOpacity="0.25"/>
    <circle cx="16" cy="16" r="6"  strokeOpacity="0.7"/>
    <path strokeLinecap="round" d="M16 9v3M16 20v3M9 16h3M20 16h3" strokeOpacity="0.9"/>
    <circle cx="16" cy="16" r="2.5" fill="currentColor" opacity="0.6"/>
  </svg>
);

/* Section divider with label */
function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 col-span-2">
      <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
      <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-slate-700">{text}</span>
      <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
    </div>
  );
}

export default function Diabetes() {
  const [form, setForm] = useState(INITIAL);
  const { accuracy, loadingAcc, result, loading, error, showModal, setShowModal, predict } = useDiseasePredict("diabetes");

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = () => {
  const payload = {
    pregnancies: parseFloat(form.pregnancies),
    glucose: parseFloat(form.glucose),
    blood_pressure: parseFloat(form.blood_pressure),
    skin_thickness: parseFloat(form.skin_thickness),
    insulin: parseFloat(form.insulin),
    bmi: parseFloat(form.bmi),
    diabetes_pedigree_function: parseFloat(form.diabetes_pedigree_function),
    age: parseFloat(form.age),
  };

  predict(payload);
};

  const isValid = Object.values(form).every(v => v !== "");
  const filled  = Object.values(form).filter(v => v !== "").length;

  return (
    <PageLayout title="Diabetes Prediction" subtitle="Assess insulin resistance & blood glucose markers."
      accentColor="cyan" icon={Icon} accuracy={accuracy} loadingAcc={loadingAcc}>

      {/* Form card */}
      <div className="rounded-2xl animate-fade-up-2 opacity-0-init"
        style={{ background: "linear-gradient(145deg,rgba(14,22,40,0.92),rgba(8,14,26,0.97))", border: "1px solid rgba(255,255,255,0.05)" }}>

        {/* Form header */}
        <div className="px-6 pt-5 pb-4 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div>
            <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-slate-600">Patient Parameters</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-1 rounded-full overflow-hidden" style={{ width: 80, background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                  style={{ width: `${(filled / FIELDS.length) * 100}%`, boxShadow: "0 0 6px #22d3ee88" }} />
              </div>
              <span className="text-[10px] font-mono text-slate-600">{filled}/{FIELDS.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
            style={{ background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.12)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth={2} className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.7-1.31 2.31l-1.64-.41"/>
            </svg>
            <span className="text-[10px] font-mono text-cyan-400">Metabolic Panel</span>
          </div>
        </div>

        {/* Inputs */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SectionLabel text="Obstetric & Metabolic" />
            {FIELDS.slice(0, 4).map(f => (
              <InputField key={f.name} {...f} type="number" value={form[f.name]} onChange={handleChange} />
            ))}
            <SectionLabel text="Body Composition & History" />
            {FIELDS.slice(4).map(f => (
              <InputField key={f.name} {...f} type="number" value={form[f.name]} onChange={handleChange} />
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl px-4 py-3.5 flex items-start gap-3 animate-fade-in opacity-0-init"
              style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2} className="w-4 h-4 shrink-0 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
              </svg>
              <div>
                <p className="text-xs font-display font-semibold text-red-400 mb-0.5">Prediction Failed</p>
                <p className="text-[11px] font-body text-red-400/60">{error}</p>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <button onClick={handleSubmit} disabled={!isValid || loading}
              className="btn-gradient w-full py-4 rounded-xl font-display font-bold text-sm tracking-wider text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden">
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                    <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  <span>Analyzing Patient Data…</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.7-1.31 2.31l-1.64-.41"/>
                  </svg>
                  Run Prediction
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                  </svg>
                </span>
              )}
            </button>
            {!isValid && (
              <p className="text-center text-[10px] font-mono text-slate-700 mt-2 tracking-wider">
                Complete all {FIELDS.length - filled} remaining field{FIELDS.length - filled !== 1 ? "s" : ""} to proceed
              </p>
            )}
          </div>
        </div>
      </div>

      {showModal && result && (
        <ResultModal result={result} onClose={() => setShowModal(false)} diseaseName="Diabetes" accentColor="cyan" />
      )}
    </PageLayout>
  );
}
