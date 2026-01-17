/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a", // Deep slate for luxury feel
        accent: "#c0aaf5", // Soft purple/lavender from reference if appropriate, or maybe gold/silver?
        // Let's stick to neutral luxury first
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'], // Good for luxury headers
      },
    },
  },
  plugins: [],
}
