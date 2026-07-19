/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef1f9',
          100: '#d5ddf0',
          200: '#abbae1',
          300: '#7d92ce',
          400: '#556fbc',
          500: '#3554ab',
          600: '#1B3478',
          700: '#162c63',
          800: '#102050',
          900: '#0b163a',
        },
        sky: {
          brand: '#1E90D8',
          light: '#5ab5e8',
          pale: '#e8f4fc',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
