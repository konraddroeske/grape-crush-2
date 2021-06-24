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
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        headline: ['Stolzl', 'Arial'],
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: {
        DEFAULT: '#FFFFFF',
      },
      black: {
        DEFAULT: '#000000',
      },
      blue: {
        DEFAULT: '#4348E3',
      },
      purple: {
        light: '#eee5fa',
        DEFAULT: '#C297EF',
      },
      lime: {
        DEFAULT: 'rgba(216, 255, 108, 1.0)',
        light: 'rgba(217, 255, 108, 0.5)',
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
