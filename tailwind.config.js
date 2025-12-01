
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
          DEFAULT: '#E60012',
          600: '#D81616',
          700: '#C41414'
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
