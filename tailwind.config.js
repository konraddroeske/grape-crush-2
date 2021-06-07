const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      blue: {
        DEFAULT: '#4348E3',
      },
      purple: {
        DEFAULT: '#C297EF',
      },
      lime: {
        DEFAULT: '#D9FF6C',
      },
      orange: {
        DEFAULT: '#FF8657',
      },
      gray: {
        dark: '#414042',
        DEFAULT: '#828282',
        light: '#F1F2F2',
      },
    },
  },
  variants: {
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
