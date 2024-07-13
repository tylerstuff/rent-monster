import type { Config } from "tailwindcss";

const defaultTheme = require('tailwindcss/defaultTheme')
const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'dark-bg': '#121212',
      }
    },
  },
  plugins: [require('@tailwindcss/forms'),],
};
export default config;
