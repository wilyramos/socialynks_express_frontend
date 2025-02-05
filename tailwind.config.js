/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home": "url('/bg.svg')",
      },
      backgroundSize: {
        "home-xl": "50%",
      },     
    },
  },
  plugins: [
    forms,
  ],
};
