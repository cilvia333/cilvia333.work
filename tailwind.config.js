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
    extend: {},
  },
  variants: {},
  plugins: [],
};
