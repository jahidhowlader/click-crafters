/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "black": "#000",
      "white": "#fff",
      "blue": "#0000FF"
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}

