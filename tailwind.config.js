/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#2EC4B6",
          secondary: "#E71D36",
          accent: "#FF9F1C",
          neutral: "#898A88",
          "base-100": "#fcfcfc",
          "base-200": "#efefef",
          "base-300": "#dcdcdc",
          "base-400": "#bdbdbd"
        },
        dark: {
          primary: "#2EC4B6",
          secondary: "#E71D36",
          accent: "#FF9F1C",
          neutral: "#898A88",
          "base-100": "#141414",
          "base-200": "#3d3d3d",
          "base-300": "#454545",
          "base-400": "#4f4f4f"
        },
      },
    ],
  },
};