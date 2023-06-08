/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "primary-clr": "#3D3D3D",
      "black": "#000",
      "white": "#fff",
      "blue": "#18D7DA",
      "orange": "#FFA400"
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}

