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
        text: ['Noto Sans JP', defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        circle: '50%',
      },
      transitionDelay: {
        '0': '0ms',
      },
      boxShadow: {
        'blur-black': '0 0 2px 4px rgba(#000000)',
        'blur-ivoly': '0 0 2px 4px rgba(#F2F2F0)',
      },
    },
  },
  variants: {
    width: ['responsive', 'hover', 'group-hover'],
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-black': {
          textShadow: '0 0 1px rgba(#000, 0.25)',
        },
        '.text-shadow-md-black': {
          textShadow: '0 0 2px rgba(#000, 0.25)',
        },
        '.text-shadow-lg-black': {
          textShadow: '0 0 3px rgba(#000, 0.25)',
        },
        '.text-shadow-xl-black': {
          textShadow: '0 0 4px rgba(#000, 0.25)',
        },
        '.text-shadow-2xl-black': {
          textShadow: '0 0 5px rgba(#000, 0.25)',
        },
        '.text-shadow-ivoly': {
          textShadow: '0 0 1px rgba(#F2F2F0, 0.25)',
        },
        '.text-shadow-md-ivoly': {
          textShadow: '0 0 2px rgba(#F2F2F0, 0.25)',
        },
        '.text-shadow-lg-ivoly': {
          textShadow: '0 0 3px rgba(#F2F2F0, 0.25)',
        },
        '.text-shadow-xl-ivoly': {
          textShadow: '0 0 4px rgba(#F2F2F0, 0.25)',
        },
        '.text-shadow-2xl-ivoly': {
          textShadow: '0 0 5px rgba(#F2F2F0, 0.25)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
