/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#2EC4B6",
          secondary: "#E71D36",
          accent: "#FF9F1C",
          neutral: "#7F8B92",
          "base-100": "#FDFFFC"

        },
        dark: {
          primary: "#2EC4B6",
          secondary: "#E71D36",
          accent: "#FF9F1C",
          neutral: "#7F8B92",
          "base-100": "#011627"
        }
      }
    ],
  },
}