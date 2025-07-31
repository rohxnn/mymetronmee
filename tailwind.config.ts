import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#6B7280",
        background: "#F3F4F6",
        surface: "#FFFFFF",
        "on-primary": "#FFFFFF",
        "on-secondary": "#FFFFFF",
        "on-background": "#1F2937",
        "on-surface": "#111827",
      },
    },
  },
  plugins: [],
};
export default config;