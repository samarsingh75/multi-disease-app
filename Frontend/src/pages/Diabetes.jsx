import React, { useState } from "react";
import axios from "axios";
import PageLayout from "../components/PageLayout";
import InputField from "../components/InputField";
import ResultCard from "../components/ResultCard";
import Spinner from "../components/Spinner";

const BASE_URL = "https://multi-disease-api-cg2f.onrender.com";

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

const DiabetesIcon = (
  <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="16" cy="16" r="12" strokeOpacity="0.3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 10v4M16 22v-4M10 16h4M22 16h-4" />
    <circle cx="16" cy="16" r="4" />
  </svg>
);

export default function Diabetes() {
  const [form, setForm] = useState(INITIAL);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {};
      for (const key of Object.keys(form)) {
        payload[key] = parseFloat(form[key]);
      }

      const [predRes, infoRes] = await Promise.all([
        axios.post(`${BASE_URL}/predict/diabetes`, payload),
        axios.get(`${BASE_URL}/model-info/diabetes`),
      ]);

      setResult({
        riskLevel: predRes.data.risk_level,
        probability: predRes.data.probability,
        accuracy: infoRes.data.accuracy,
      });
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to connect to the prediction server. Please ensure the API is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const isValid = Object.values(form).every((v) => v !== "");

  return (
    <PageLayout
      title="Diabetes Prediction"
      subtitle="Provide patient biomarker data to assess type-2 diabetes risk."
      accentColor="cyan"
      icon={DiabetesIcon}
    >
      {/* Form Card */}
      <div className="glass rounded-2xl p-6 mb-5 animate-fade-up-2 opacity-0-init">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/[0.06]">
          <span className="text-xs font-mono tracking-widest uppercase text-slate-400">
            Patient Parameters
          </span>
          <span className="text-xs font-mono text-slate-600">— {FIELDS.length} inputs required</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FIELDS.map((f) => (
            <InputField
              key={f.name}
              {...f}
              type="number"
              value={form[f.name]}
              onChange={handleChange}
            />
          ))}
        </div>

        {/* Submit */}
        <div className="mt-6 pt-4 border-t border-white/[0.06]">
          <button
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className="btn-gradient w-full py-3.5 rounded-xl font-display font-semibold text-sm tracking-wider text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Analyzing...
              </span>
            ) : (
              "Run Prediction →"
            )}
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="glass rounded-2xl p-10 flex items-center justify-center animate-fade-up opacity-0-init">
          <Spinner size="lg" label="Running ML inference..." />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 animate-fade-up opacity-0-init">
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

      {/* Result */}
      {result && !loading && (
        <ResultCard
          riskLevel={result.riskLevel}
          probability={result.probability}
          accuracy={result.accuracy}
        />
      )}
    </PageLayout>
  );
}
