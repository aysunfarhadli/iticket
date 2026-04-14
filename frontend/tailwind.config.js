/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:'#fffaeb',100:'#fff0c7',200:'#ffe28a',300:'#ffd24d',400:'#ffc21f',
          500:'#F5B400',600:'#d49b00',700:'#a67a00',800:'#7d5c00',900:'#4d3900'
        },
        mint:    { 500:'#00A9A5', 600:'#00908d' },
        success: '#39C57F',
        warn:    '#F4B400',
        danger:  '#E95050',
        ink:     { 900:'#111418', 800:'#1a1f26', 700:'#262d36' },
        surface: '#F8F9FB'
      },
      fontFamily: {
        sans: ['-apple-system','BlinkMacSystemFont','"SF Pro Display"','"SF Pro Text"','"Inter"','"Helvetica Neue"','Arial','sans-serif']
      },
      boxShadow: {
        soft: '0 4px 16px -4px rgba(15,23,42,0.08)',
        card: '0 8px 24px -8px rgba(15,23,42,0.10)',
        glow: '0 12px 40px -12px rgba(245,180,0,0.55)'
      }
    }
  },
  plugins: []
};
