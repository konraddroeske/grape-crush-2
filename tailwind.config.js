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
    fontSize: {
      xs: ['.75rem', '1rem'],
      sm: ['.875rem', '1.25rem'],
      tiny: ['.875rem', '1.25rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.125rem', '1.65rem'],
      xl: ['1.25rem', '1.75rem'],
      '2xl': ['1.5rem', '2rem'],
      '3xl': ['1.875rem', '2.25rem'],
      '4xl': ['2.25rem', '2.5rem'],
      '5xl': ['3rem', '1'],
      '6xl': ['4rem', '1'],
      '7xl': ['5rem', '1'],
      '8xl': ['6rem', '1'],
      '9xl': ['8rem', '1'],
      '10xl': ['10rem', '1'],
      '11xl': ['11rem', '1'],
      '12xl': ['12rem', '1'],
    },
    stroke: {
      blue: '#2C148E',
    },
    backgroundColor: {
      blue: {
        dark: '#2C148E',
        DEFAULT: '#4348E3',
        light: 'rgba(44, 20, 142, 0.05)',
      },
      lime: {
        // DEFAULT: 'rgba(216, 255, 108, 1.0)',
        background: 'rgba(223,255,133,0.2)',
        DEFAULT: '#DFFF85',
        light: 'rgba(217, 255, 108, 0.5)',
        lightest: '#F5FFDA',
      },
      // paleLime: {
      //   DEFAULT:
      // },
      white: {
        DEFAULT: '#FFFFFF',
      },
      transparent: {
        DEFAULT: 'transparent',
      },
      gray: {
        dark: '#414042',
        DEFAULT: '#828282',
        light: '#BDBDBD',
        lightest: '#F1F2F2',
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
      xs: '475px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  variants: {
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
