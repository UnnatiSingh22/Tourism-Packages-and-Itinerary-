/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#E65A4B',
          50: '#FDF3F2',
          100: '#FCE7E5',
          light: '#FDF3F2',
        },
        background: '#F8F8FA',
        card: '#FFFFFF',
      },
      borderRadius: {
        'xl': '20px',
        '2xl': '24px',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'card': '0 2px 10px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
}
