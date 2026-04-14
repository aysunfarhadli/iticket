/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:'#fff3ec',100:'#ffe0cc',200:'#ffc199',300:'#ff9c66',400:'#ff7a3d',
          500:'#F15A29',600:'#d94717',700:'#b2380f',800:'#8c2c0c',900:'#6b220a'
        },
        mint:    { 500:'#00A9A5', 600:'#00908d' },
        success: '#39C57F',
        warn:    '#F4B400',
        danger:  '#E95050',
        ink:     { 900:'#111418', 800:'#1a1f26', 700:'#262d36' },
        surface: '#F8F9FB'
      },
      fontFamily: { sans: ['Inter','system-ui','sans-serif'] },
      boxShadow: {
        soft: '0 4px 16px -4px rgba(15,23,42,0.08)',
        card: '0 8px 24px -8px rgba(15,23,42,0.10)',
        glow: '0 12px 40px -12px rgba(241,90,41,0.45)'
      }
    }
  },
  plugins: []
};
