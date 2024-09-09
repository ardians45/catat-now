/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-500': '#3b82f6', // warna kustom
        'gray-900': '#1a202c', // Warna gelap untuk mode gelap
        'gray-800': '#2d3748', // Warna abu-abu untuk mode gelap
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-2px)' },
        },
      },
      animation: {
        spin: 'spin 1s linear infinite',
        shake: 'shake 0.3s ease-in-out',
      },
      boxShadow: {
        'inner-right': 'inset -2px 0 8px -2px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  darkMode: 'class', // Untuk mendukung mode gelap dengan kelas
  plugins: [],
};
