/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ptBackground: "#F5F1EA",
        ptText: "#2E2E2E",
        ptMuted: "#9B9B9B",
        ptAccent: "#1CC5C5"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(0,0,0,0.06)"
      }
    }
  },
  plugins: []
};
