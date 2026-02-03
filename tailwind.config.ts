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
        neutral: {
          850: "#1a1d1e",
          925: "#0f1112",
        },
        muted: {
          green: "#5a6b5a",
          "green-light": "#7a8f7a",
          "green-dark": "#3d4d3d",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      transitionDuration: {
        subtle: "150ms",
        gentle: "200ms",
        calm: "250ms",
      },
    },
  },
  plugins: [],
};

export default config;
