import React, { useState } from "react";
import axios from "axios";
import PageLayout from "../components/PageLayout";
import InputField from "../components/InputField";
import ResultCard from "../components/ResultCard";

const BASE_URL = "http://127.0.0.1:8000";

const INITIAL = {
  age: "",
  sex: "",
  cp: "",
  trestbps: "",
  chol: "",
  fbs: "",
  restecg: "",
  thalach: "",
  exang: "",
  oldpeak: "",
  slope: "",
  ca: "",
  thal: "",
};

const FIELDS = [
  { name: "age", label: "Age", placeholder: "52", hint: "years", min: 1, max: 120 },
  { name: "sex", label: "Sex", placeholder: "1 = Male, 0 = Female", hint: "binary", min: 0, max: 1 },
  { name: "cp", label: "Chest Pain Type", placeholder: "0–3", hint: "0-3", min: 0, max: 3 },
  { name: "trestbps", label: "Resting Blood Pressure", placeholder: "130", hint: "mmHg", min: 80, max: 250 },
  { name: "chol", label: "Serum Cholesterol", placeholder: "240", hint: "mg/dL", min: 100, max: 600 },
  { name: "fbs", label: "Fasting Blood Sugar > 120", placeholder: "1 = True, 0 = False", hint: "binary", min: 0, max: 1 },
  { name: "restecg", label: "Resting ECG Results", placeholder: "0–2", hint: "0-2", min: 0, max: 2 },
  { name: "thalach", label: "Max Heart Rate", placeholder: "160", hint: "bpm", min: 60, max: 250 },
  { name: "exang", label: "Exercise Induced Angina", placeholder: "1 = Yes, 0 = No", hint: "binary", min: 0, max: 1 },
  { name: "oldpeak", label: "ST Depression (Oldpeak)", placeholder: "1.0", hint: "mm", min: 0, max: 10, step: 0.1 },
  { name: "slope", label: "Slope of ST Segment", placeholder: "0–2", hint: "0-2", min: 0, max: 2 },
  { name: "ca", label: "Major Vessels (Fluoroscopy)", placeholder: "0–4", hint: "count", min: 0, max: 4 },
  { name: "thal", label: "Thalassemia", placeholder: "0–3", hint: "0-3", min: 0, max: 3 },
];

const HeartIcon = (
  <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 27s-10-6.5-10-13.5A6.5 6.5 0 0116 10a6.5 6.5 0 0110 3.5C26 20.5 16 27 16 27z" strokeOpacity="0.8" />
    <path strokeLinecap="round" d="M10 17h3l2-4 3 8 2.5-6 1.5 2H26" strokeOpacity="0.6" />
  </svg>
);

export default function Heart() {
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
        axios.post(`${BASE_URL}/predict/heart`, payload),
        axios.get(`${BASE_URL}/model-info/heart`),
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
    <PageLayout title="Heart Disease Prediction" subtitle="Evaluate cardiovascular risk using clinical biomarker data." accentColor="rose" icon={HeartIcon}>
      <div className="glass rounded-2xl p-6 mb-5 animate-fade-up-2 opacity-0-init">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/[0.06]">
          <span className="text-xs font-mono tracking-widest uppercase text-slate-400">Cardiovascular Parameters</span>
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
            style={{ background: "linear-gradient(135deg, #e11d48 0%, #7c3aed 100%)" }}
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
