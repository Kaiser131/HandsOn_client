/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kaushan: " 'Kaushan Script', serif",
        sirin: ["Sirin Stencil", "serif"],
        raleway: ["Raleway", "serif"],
        merriway: ["Merriweather", "serif"],
        lexend: ["Lexend Giga", "serif"],
      },
    },
  },
  plugins: [],
};