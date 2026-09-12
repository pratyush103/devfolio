/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--bg-main)",
        secondary: "var(--bg-surface)",
        cyanAccent: "var(--accent-primary)",
        tealAccent: "var(--accent-secondary)",
        textMain: "var(--text-main)",
        textMuted: "var(--text-muted)",
        rule: "var(--rule)",
        sunOrange: "var(--accent-sun)",
        sunGlow: "var(--accent-sun-glow)",
        deepViolet: "var(--accent-violet)",
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        heading: ['var(--font-heading)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
