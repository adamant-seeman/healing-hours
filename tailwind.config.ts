import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lavender: "#B8A5D6",
        purple: "#8F7AB8",
        beige: "#E8DED4",
        cream: "#FAF8F5",
        sage: "#A8B5A2",
        ink: "#393342"
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "Avenir Next", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        bloom: "0 24px 70px rgba(93, 77, 121, 0.18)",
        glass: "0 18px 50px rgba(72, 56, 95, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
