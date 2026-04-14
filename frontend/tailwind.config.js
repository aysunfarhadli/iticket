/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:'#eef3ff',100:'#dde7ff',200:'#bccdff',300:'#8fa9ff',400:'#5f82ff',
          500:'#3A66FF',600:'#2f54e6',700:'#243fb3',800:'#1c3289',900:'#152567'
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
        glow: '0 12px 40px -12px rgba(58,102,255,0.45)'
      }
    }
  },
  plugins: []
};
