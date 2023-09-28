import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        typing: {
          from: { width: "0px" },
          to: { width: "100%" },
        },
      },
      animation: {
        typing: "typing 1.5s steps(30, end)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
