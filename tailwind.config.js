/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        merriweather: ["Merriweather", "serif"],
        "playfair-display": ["Playfair Display", "serif"],
        Titillium: ["Titillium Web", "sans-serif"],
        cinzel: ["Cinzel", "serif"],
        exo: ["Exo 2", "sans-serif"],
      },
      colors: {
        "celestial-blue": "#009ddcff",
        gunmetal: "#272d2dff",
        "ghost-white": "#fffaffff",
      },
      screens: {
        xs: "425px",
        "2xs": "375px",
        "3xs": "320px",
      },
    },
  },
  plugins: [],
};
