/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C9A86A',
        secondary: '#2A2A2A',
        accent: '#B8956A',
        background: '#FAFAF7',
        surface: '#F0EDE8',
        charcoal: '#2A2A2A',
        text: '#1A1A1A',
        'text-muted': '#6B6B6B',
        border: '#E0DDD8',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.03em',
        tighter: '-0.02em',
      },
      maxWidth: {
        prose: '65ch',
      },
    },
  },
  plugins: [],
}
