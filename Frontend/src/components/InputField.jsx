import React from "react";

export default function InputField({ label, name, type = "number", placeholder, value, onChange, hint, min, max, step }) {
  return (
    <div className="flex flex-col gap-1.5 group">
      <div className="flex items-center justify-between">
        <label htmlFor={name} className="text-[10px] font-mono font-medium tracking-widest uppercase text-slate-500 group-focus-within:text-cyan-400/80 transition-colors">
          {label}
        </label>
{hint && (
  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20 shadow-sm shadow-cyan-500/20">
    {hint}
  </span>
)}
      </div>
      <div className="relative">
        <input
          id={name} name={name} type={type}
          placeholder={placeholder} value={value} onChange={onChange}
          min={min} max={max} step={step}
          className="input-field w-full rounded-lg px-3.5 py-2.5 text-sm font-body font-medium"
        />
        {/* Focus accent line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-cyan-400/60 group-focus-within:w-full transition-all duration-300 rounded-full" />
      </div>
    </div>
  );
}
