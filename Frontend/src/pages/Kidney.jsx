import React, { useState } from "react";
import axios from "axios";
import PageLayout from "../components/PageLayout";
import InputField from "../components/InputField";
import ResultCard from "../components/ResultCard";

const BASE_URL = "https://multi-disease-api-cg2f.onrender.com";

const INITIAL = {
  age: "",
  bp: "",
  sg: "",
  al: "",
  su: "",
  bgr: "",
  bu: "",
  sc: "",
  sod: "",
  pot: "",
  hemo: "",
  pcv: "",
  wc: "",
  rc: "",
};

const FIELDS = [
  { name: "age", label: "Age", placeholder: "48", hint: "years", min: 1, max: 120 },
  { name: "bp", label: "Blood Pressure", placeholder: "80", hint: "mmHg", min: 50, max: 200 },
  { name: "sg", label: "Specific Gravity", placeholder: "1.020", hint: "ratio", min: 1.005, max: 1.035, step: 0.001 },
  { name: "al", label: "Albumin", placeholder: "1", hint: "0–5", min: 0, max: 5 },
  { name: "su", label: "Sugar", placeholder: "0", hint: "0–5", min: 0, max: 5 },
  { name: "bgr", label: "Blood Glucose Random", placeholder: "120", hint: "mg/dL", min: 50, max: 500 },
  { name: "bu", label: "Blood Urea", placeholder: "36", hint: "mg/dL", min: 1, max: 400 },
  { name: "sc", label: "Serum Creatinine", placeholder: "1.2", hint: "mg/dL", min: 0.4, max: 80, step: 0.1 },
  { name: "sod", label: "Sodium", placeholder: "137", hint: "mEq/L", min: 100, max: 170 },
  { name: "pot", label: "Potassium", placeholder: "4.0", hint: "mEq/L", min: 2, max: 10, step: 0.1 },
  { name: "hemo", label: "Hemoglobin", placeholder: "13.0", hint: "g/dL", min: 3, max: 20, step: 0.1 },
  { name: "pcv", label: "Packed Cell Volume", placeholder: "41", hint: "%", min: 10, max: 60 },
  { name: "wc", label: "White Blood Cell Count", placeholder: "8000", hint: "cells/cumm", min: 2000, max: 30000 },
  { name: "rc", label: "Red Blood Cell Count", placeholder: "4.8", hint: "millions/cmm", min: 2, max: 8, step: 0.1 },
];

const KidneyIcon = (
  <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6c-3 0-6 3-6 7.5 0 6 3 9 6 12 .75 1.1 1.5 1.5 2.25 1.5s1.5-.4 2.25-1.5c3-3 6-6 6-12C22.5 9 19.5 6 16.5 6" strokeOpacity="0.8" />
    <circle cx="13" cy="13" r="1.5" strokeOpacity="0.5" />
    <circle cx="19" cy="18" r="1.5" strokeOpacity="0.5" />
  </svg>
);

export default function Kidney() {
  const [form, setForm] = useState(INITIAL);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const payload = {};
      for (const k of Object.keys(form)) payload[k] = parseFloat(form[k]);

      const [predRes, infoRes] = await Promise.all([
        axios.post(`${BASE_URL}/predict/kidney`, payload),
        axios.get(`${BASE_URL}/model-info/kidney`),
      ]);
      setResult({ riskLevel: predRes.data.risk_level, probability: predRes.data.probability, accuracy: infoRes.data.accuracy });
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to connect to prediction server.");
    } finally {
      setLoading(false);
    }
  };

  const isValid = Object.values(form).every((v) => v !== "");

  return (
    <PageLayout title="Kidney Disease Prediction" subtitle="Analyze renal function markers for chronic kidney disease risk." accentColor="violet" icon={KidneyIcon}>
      <div className="glass rounded-2xl p-6 mb-5 animate-fade-up-2 opacity-0-init">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/[0.06]">
          <span className="text-xs font-mono tracking-widest uppercase text-slate-400">Renal Parameters</span>
          <span className="text-xs font-mono text-slate-600">— {FIELDS.length} inputs required</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FIELDS.map((f) => (
            <InputField key={f.name} {...f} type="number" value={form[f.name]} onChange={handleChange} />
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-white/[0.06]">
          <button
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className="w-full py-3.5 rounded-xl font-display font-semibold text-sm tracking-wider text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
            style={{ background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)" }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Analyzing...
              </span>
            ) : "Run Prediction →"}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 animate-fade-up opacity-0-init mb-5">
          <div className="flex items-start gap-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-red-400 shrink-0 mt-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <div>
              <p className="text-sm font-display font-semibold text-red-400 mb-0.5">Prediction Failed</p>
              <p className="text-xs font-body text-red-300/70">{error}</p>
            </div>
          </div>
        </div>
      )}

      {result && !loading && <ResultCard riskLevel={result.riskLevel} probability={result.probability} accuracy={result.accuracy} />}
    </PageLayout>
  );
}
