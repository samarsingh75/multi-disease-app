import React, { useState } from "react";
import axios from "axios";
import PageLayout from "../components/PageLayout";
import InputField from "../components/InputField";
import ResultCard from "../components/ResultCard";

const BASE_URL = "https://multi-disease-api-cg2f.onrender.com";

const INITIAL = {
  age: "",
  educ: "",
  ses: "",
  mmse: "",
  cdr: "",
  etiv: "",
  nwbv: "",
  asf: "",
};

const FIELDS = [
  { name: "age", label: "Age", placeholder: "72", hint: "years", min: 40, max: 100 },
  { name: "educ", label: "Years of Education", placeholder: "14", hint: "years", min: 0, max: 25 },
  { name: "ses", label: "Socioeconomic Status", placeholder: "2", hint: "1–5", min: 1, max: 5 },
  { name: "mmse", label: "Mini-Mental State Exam", placeholder: "27", hint: "score 0–30", min: 0, max: 30 },
  { name: "cdr", label: "Clinical Dementia Rating", placeholder: "0.5", hint: "0–3", min: 0, max: 3, step: 0.5 },
  { name: "etiv", label: "Est. Total Intracranial Vol.", placeholder: "1500", hint: "cm³", min: 900, max: 2200 },
  { name: "nwbv", label: "Normalized Whole Brain Vol.", placeholder: "0.72", hint: "ratio", min: 0.5, max: 0.9, step: 0.001 },
  { name: "asf", label: "Atlas Scaling Factor", placeholder: "1.15", hint: "factor", min: 0.8, max: 1.6, step: 0.001 },
];

const AlzheimerIcon = (
  <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 5c-5.5 0-9.5 3.5-9.5 8 0 2.8 1.3 5 3.5 6.5v5H22v-5c2.2-1.5 3.5-3.7 3.5-6.5C25.5 8.5 21.5 5 16 5z" strokeOpacity="0.8" />
    <path strokeLinecap="round" d="M12 15c.7-1.3 2-2 4-2s3.3.7 4 2" strokeOpacity="0.5" />
    <path strokeLinecap="round" d="M14 24.5v-3.5M18 24.5v-3.5" strokeOpacity="0.4" />
  </svg>
);

export default function Alzheimer() {
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
        axios.post(`${BASE_URL}/predict/alzheimer`, payload),
        axios.get(`${BASE_URL}/model-info/alzheimer`),
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
    <PageLayout title="Alzheimer's Prediction" subtitle="Screen neurological biomarkers for early-stage Alzheimer's detection." accentColor="amber" icon={AlzheimerIcon}>
      <div className="glass rounded-2xl p-6 mb-5 animate-fade-up-2 opacity-0-init">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/[0.06]">
          <span className="text-xs font-mono tracking-widest uppercase text-slate-400">Neurological Parameters</span>
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
            style={{ background: "linear-gradient(135deg, #d97706 0%, #dc2626 100%)" }}
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
