/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    textColor: {
      primary: "var(--color-text-primary)",
      secondary: "var(--color-text-secondary)",
      default: "var(--color-text-default)",
      inverse: "var(--color-text-inverse)",
    },
    fill: {
      primary: "var(--color-text-primary)",
      secondary: "var(--color-text-secondary)",
      default: "var(--color-text-default)",
      inverse: "var(--color-text-inverse)",
    },
    backgroundColor: {
      primary: "var(--color-bg-primary)",
      secondary: "var(--color-bg-secondary)",
      default: "var(--color-bg-default)",
      inverse: "var(--color-bg-inverse)",
      "item-default": "var(--color-bg-item-default)",
      "item-correct": "var(--color-bg-item-correct)",
      "item-warning": "var(--color-bg-item-warning)",
      "item-incorrect": "var(--color-bg-item-incorrect)",
      keyboard: "var(--color-bg-keyboard)",
      key: "var(--color-bg-key)",
      backdrop: "var(--color-bg-backdrop)",
      btn: "var(--color-bg-btn)",
    },
    fontFamily: {
      body: "var(--font-body)",
    },
    fontWeights: {
      normal: "var(--font-weight-normal)",
      keyboard: "var(--font-weight-keyboard)",
      time: "var(--font-weight-time)",
      btn: "var(--font-weight-btn)",
    },
    borderRadius: {
      none: "0",
      soft: "var(--rounded-soft)",
      hard: "var(--rounded-hard)",
    },
  },
  plugins: [],
};
