const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'src/**/*.css',
      'src/**/*.js',
      'src/**/*.ts',
      'src/**/*.jsx',
      'src/**/*.tsx',
    ],
  },
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#feefcd',
          200: '#fee3aa',
          300: '#fdd681',
          400: '#fdca5e',
          500: '#fcbf3b',
          600: '#f1a604',
          700: '#b07903',
          800: '#745002',
          900: '#322301',
        },
        base: {
          50: '#FCFCFC',
          100: '#FAFAF9',
          200: '#F2F2F0',
          300: '#EAEAE7',
          400: '#DADAD5',
          500: '#CACAC3',
          600: '#B6B6B0',
          700: '#797975',
          800: '#5B5B58',
          900: '#3D3D3B',
        },
      },
      fontFamily: {
        header: ['brandon-grotesque', defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        circle: '50%',
      },
    },
  },
  variants: {},
  plugins: [],
};
