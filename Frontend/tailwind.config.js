/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pulse-ring": {
          "0%":   { transform: "scale(0.85)", opacity: "1" },
          "100%": { transform: "scale(1.7)",  opacity: "0" },
        },
        "ecg-scroll": {
          "0%":   { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        "float": {
          "0%,100%": { transform: "translateY(0px)"  },
          "50%":     { transform: "translateY(-6px)" },
        },
        "heartbeat": {
          "0%,100%": { transform: "scale(1)"    },
          "14%":     { transform: "scale(1.15)" },
          "28%":     { transform: "scale(1)"    },
          "42%":     { transform: "scale(1.1)"  },
          "56%":     { transform: "scale(1)"    },
        },
        "scan-line": {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(400%)"  },
        },
        "particle-drift": {
          "0%":   { transform: "translateY(0) translateX(0) rotate(0deg)",   opacity: "0" },
          "10%":  { opacity: "0.6" },
          "90%":  { opacity: "0.3" },
          "100%": { transform: "translateY(-80px) translateX(20px) rotate(180deg)", opacity: "0" },
        },
        "dna-spin": {
          "0%":   { transform: "rotateY(0deg)"   },
          "100%": { transform: "rotateY(360deg)" },
        },
        "brain-pulse": {
          "0%,100%": { filter: "drop-shadow(0 0 4px #fbbf24)" },
          "50%":     { filter: "drop-shadow(0 0 12px #fbbf24)" },
        },
        "blood-flow": {
          "0%":   { strokeDashoffset: "200" },
          "100%": { strokeDashoffset: "0"   },
        },
        "shimmer-x": {
          "0%":   { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)"  },
        },
        "rotate-slow": {
          "0%":   { transform: "rotate(0deg)"   },
          "100%": { transform: "rotate(360deg)" },
        },
        "blink": {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0" },
        },
      },
      animation: {
        "fade-up":        "fade-up 0.6s ease forwards",
        "fade-up-1":      "fade-up 0.6s 0.1s ease forwards",
        "fade-up-2":      "fade-up 0.6s 0.2s ease forwards",
        "fade-up-3":      "fade-up 0.6s 0.3s ease forwards",
        "fade-up-4":      "fade-up 0.6s 0.4s ease forwards",
        "fade-up-5":      "fade-up 0.6s 0.5s ease forwards",
        "fade-in":        "fade-in 0.5s ease forwards",
        "scale-in":       "scale-in 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "pulse-ring":     "pulse-ring 1.8s ease-out infinite",
        "float":          "float 3s ease-in-out infinite",
        "heartbeat":      "heartbeat 1.2s ease-in-out infinite",
        "scan-line":      "scan-line 3s linear infinite",
        "particle-drift": "particle-drift 4s ease-in infinite",
        "dna-spin":       "dna-spin 4s linear infinite",
        "brain-pulse":    "brain-pulse 2s ease-in-out infinite",
        "blood-flow":     "blood-flow 2s linear infinite",
        "shimmer-x":      "shimmer-x 1.8s ease-in-out infinite",
        "rotate-slow":    "rotate-slow 20s linear infinite",
        "blink":          "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
