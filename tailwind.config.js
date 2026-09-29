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
          red: '#D9A900',
          ink: '#111111',
          dark: '#111111',
          muted: '#6B6B70',
          border: '#E8E8EA',
          bg: '#F7F7F8',
          whatsapp: '#25D366',
          ring: '#D9A900',
        },
      },
      borderRadius: {
        card: '10px',
      },
    },
  },
  plugins: [],
};
