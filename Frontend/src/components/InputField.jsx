import React from "react";

export default function InputField({
  label,
  name,
  type = "number",
  placeholder,
  value,
  onChange,
  hint,
  min,
  max,
  step,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="text-xs font-mono font-medium tracking-widest uppercase text-cyan-400/80"
        >
          {label}
        </label>
        {hint && (
          <span className="text-xs font-mono text-slate-500">{hint}</span>
        )}
      </div>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          className="input-field w-full rounded-lg px-4 py-3 text-sm font-body font-medium"
        />
        <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-white/[0.03]" />
      </div>
    </div>
  );
}
