/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  content: [],
  theme: {
    extend: {
      colors: {
        "color1": "#760002"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}