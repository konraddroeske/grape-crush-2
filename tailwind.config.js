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
        // headline: ['Stolzl', 'Arial'],
        headline: ['Gopher', 'Serif'],
      },
    },
    stroke: {
      blue: '#2C148E',
    },
    backgroundColor: {
      blue: {
        dark: '#2C148E',
        DEFAULT: '#4348E3',
      },
      lime: {
        // DEFAULT: 'rgba(216, 255, 108, 1.0)',
        DEFAULT: '#DFFF85',
        light: 'rgba(217, 255, 108, 0.5)',
        lightest: '#F5FFDA',
      },
      white: {
        DEFAULT: '#FFFFFF',
      },
      transparent: {
        DEFAULT: 'transparent',
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
        dark: '#2C148E',
        DEFAULT: '#4348E3',
      },
      purple: {
        light: '#eee5fa',
        DEFAULT: '#C297EF',
      },
      lime: {
        // DEFAULT: 'rgba(216, 255, 108, 1.0)',
        DEFAULT: '#DFFF85',
        light: 'rgba(217, 255, 108, 0.5)',
        lightest: '#F5FFDA',
      },
      orange: {
        DEFAULT: '#FF8657',
      },
      gray: {
        dark: '#414042',
        DEFAULT: '#828282',
        light: '#BDBDBD',
        lightest: '#F1F2F2',
      },
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  variants: {
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
