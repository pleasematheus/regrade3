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
          "base-100": "#FDFFFC",
        },
        dark: {
          primary: "#2EC4B6",
          secondary: "#E71D36",
          accent: "#FF9F1C",
          neutral: "#898A88",
          "base-100": "#141414",
          "base-200": "#4F4F4E",
        },
      },
    ],
  },
};