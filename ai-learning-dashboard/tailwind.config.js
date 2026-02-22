/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        accent: '#F59E0B',
        background: '#1F2937'
      }
    },
  },
  plugins: [],
}
