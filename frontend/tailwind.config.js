/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'railway-blue': '#1e3a8a',
        'tatkal-orange': '#ff6b35',
      },
      animation: {
        'train-move': 'train 3s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        train: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100vw)' },
        }
      }
    },
  },
  plugins: [],
}
