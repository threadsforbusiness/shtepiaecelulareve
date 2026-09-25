/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          red: '#f1c03f',
          dark: '#0A0A0A',
          muted: '#B3B3B3',
          border: '#262626',
          bg: '#151515',
          whatsapp: '#25D366',
          ring: '#3B82F6',
        },
      },
      borderRadius: {
        card: '10px',
      },
    },
  },
  plugins: [],
};
