
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f0f10',
        card: '#111213',
        accent: {
          DEFAULT: '#22C55E',
          600: '#16A34A',
          700: '#15803D'
        }
      },
      borderRadius: {
        xl: '14px',
        '2xl': '18px'
      },
      boxShadow: {
        card: '0 10px 24px rgba(0,0,0,.35)'
      }
    },
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui']
    }
  },
  plugins: []
}
