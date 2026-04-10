import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import InputField from "../components/InputField";
import ResultModal from "../components/ResultModal";
import { useDiseasePredict } from "../hooks/useDiseasePredict";
import BASE_URL from "../config";

/* ── ALL FIELDS & KEYS UNCHANGED ── */

const INITIAL = {
  age: "",
  sex: "",
  cp: "",
  trestbps: "",
  chol: "",
  thalach: "",
  exang: "",
  oldpeak: "",
};

const FIELDS = [
  { name: "age", label: "Age", placeholder: "52", hint: "years", min: 1, max: 120 },
  { name: "sex", label: "Sex", placeholder: "1 = Male, 0 = Female", hint: "binary", min: 0, max: 1 },
  { name: "cp", label: "Chest Pain Type", placeholder: "0–3", hint: "0-3", min: 0, max: 3 },
  { name: "trestbps", label: "Resting Blood Pressure", placeholder: "130", hint: "mmHg", min: 80, max: 250 },
  { name: "chol", label: "Serum Cholesterol", placeholder: "240", hint: "mg/dL", min: 100, max: 600 },
  { name: "thalach", label: "Max Heart Rate", placeholder: "160", hint: "bpm", min: 60, max: 250 },
  { name: "exang", label: "Exercise Induced Angina", placeholder: "1 = Yes, 0 = No", hint: "binary", min: 0, max: 1 },
  { name: "oldpeak", label: "ST Depression (Oldpeak)", placeholder: "1.0", hint: "mm", min: 0, max: 10, step: 0.1 },
];
const Icon = (
  <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 27s-10-6.5-10-13.5A6.5 6.5 0 0116 10a6.5 6.5 0 0110 3.5C26 20.5 16 27 16 27z" strokeOpacity="0.8"/>
    <path strokeLinecap="round" d="M9 17h3.5l2-4 3 8 2.5-6 1.5 2H27" strokeOpacity="0.7"/>
  </svg>
);

/* Inline mini ECG strip decoration */
function ECGStrip() {
  return (
    <div className="col-span-2 rounded-xl overflow-hidden relative" style={{ height: 44, background: "rgba(251,113,133,0.04)", border: "1px solid rgba(251,113,133,0.1)" }}>
      <svg viewBox="0 0 400 44" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="ecgG2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fb7185" stopOpacity="0"/>
            <stop offset="30%" stopColor="#fb7185" stopOpacity="0.6"/>
            <stop offset="70%" stopColor="#fb7185" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#fb7185" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d="M0,22 L40,22 L50,22 L55,4 L60,40 L65,4 L70,22 L95,22 L100,20 L102,24 L104,22 L150,22 L155,22 L160,4 L165,40 L170,4 L175,22 L200,22 L205,20 L207,24 L209,22 L255,22 L260,22 L265,4 L270,40 L275,4 L280,22 L305,22 L310,20 L312,24 L314,22 L360,22 L365,22 L370,4 L375,40 L380,4 L385,22 L400,22"
          fill="none" stroke="url(#ecgG2)" strokeWidth="1.5" strokeLinecap="round"
          style={{ strokeDasharray: 900, strokeDashoffset: 900, animation: "ecg-scroll 3s linear infinite" }}
        />
      </svg>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
        <span className="w-1 h-1 rounded-full bg-rose-400 animate-pulse" />
        <span className="text-[9px] font-mono tracking-widest uppercase text-rose-400/50">ECG Trace</span>
      </div>
    </div>
  );
}

function SectionLabel({ text, className = "" }) {
  return (
    <div className={`flex items-center gap-3 col-span-2 my-2 ${className}`}>
      <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
      <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-slate-700">{text}</span>
      <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
    </div>
  );
}

export default function Heart() {
  const [form, setForm] = useState(INITIAL);
  const { accuracy, loadingAcc, result, loading, error, showModal, setShowModal, predict } = useDiseasePredict("heart");

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
const handleSubmit = () => {
  const payload = {
    age: parseFloat(form.age),
    sex: parseFloat(form.sex),
    cp: parseFloat(form.cp),
    trestbps: parseFloat(form.trestbps),
    chol: parseFloat(form.chol),
    thalch: parseFloat(form.thalach),
    exang: parseFloat(form.exang),
    oldpeak: parseFloat(form.oldpeak)
  };

  predict(payload); // ✅ MOVE HERE
};

  const isValid = Object.values(form).every(v => v !== "");
  const filled  = Object.values(form).filter(v => v !== "").length;

  return (
    <PageLayout title="Heart Disease Prediction" subtitle="Evaluate cardiovascular risk using clinical biomarker data."
      accentColor="rose" icon={Icon} accuracy={accuracy} loadingAcc={loadingAcc}>

      <div className="rounded-2xl animate-fade-up-2 opacity-0-init"
        style={{ background: "linear-gradient(145deg,rgba(14,22,40,0.92),rgba(8,14,26,0.97))", border: "1px solid rgba(255,255,255,0.05)" }}>

        <div className="px-6 pt-5 pb-4 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div>
            <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-slate-600">Cardiovascular Parameters</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-1 rounded-full overflow-hidden" style={{ width: 80, background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${(filled / FIELDS.length) * 100}%`, background: "#fb7185", boxShadow: "0 0 6px #fb718588" }} />
              </div>
              <span className="text-[10px] font-mono text-slate-600">{filled}/{FIELDS.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
            style={{ background: "rgba(251,113,133,0.06)", border: "1px solid rgba(251,113,133,0.12)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#fb7185" strokeWidth={2} className="w-3 h-3 animate-heartbeat">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
            </svg>
            <span className="text-[10px] font-mono text-rose-400">Cardiac Panel</span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <SectionLabel text="Patient Demographics" className="mt-3" />
            {FIELDS.slice(0, 3).map(f => <InputField key={f.name} {...f} type="number" value={form[f.name]} onChange={handleChange} />)}
            <SectionLabel text="Hemodynamic Markers" className="mt-3" />
            {FIELDS.slice(3, 7).map(f => <InputField key={f.name} {...f} type="number" value={form[f.name]} onChange={handleChange} />)}
            <ECGStrip />
            <SectionLabel text="Exercise & Imaging Data" className="mt-3" />
            {FIELDS.slice(7).map(f => <InputField key={f.name} {...f} type="number" value={form[f.name]} onChange={handleChange} />)}
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
              className="w-full py-4 rounded-xl font-display font-bold text-sm tracking-wider text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#e11d48 0%,#7c3aed 100%)", boxShadow: isValid ? "0 8px 24px rgba(225,29,72,0.2)" : "none" }}>
              {loading
                ? <span className="flex items-center justify-center gap-3"><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/><path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Analyzing…</span>
                : <span className="flex items-center justify-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 animate-heartbeat">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
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

      {showModal && result && <ResultModal result={result} onClose={() => setShowModal(false)} diseaseName="Heart Disease" accentColor="rose"/>}
    </PageLayout>
  );
}
