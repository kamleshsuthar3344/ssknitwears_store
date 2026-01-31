/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#C49A6C",
          cream: "#FFF4E6",
          red: "#B71C1C",
          black: "#111111",
          offwhite: "#F9F7F1",
        },
        primary: "#111111",
        accent: "#C49A6C",
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'], // Good for luxury headers
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
    },
  },
  plugins: [],
}
