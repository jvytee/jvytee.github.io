module.exports = {
  purge: {
    content: [
      './src/**/*.html',
      './src/**/*.css'
    ],
    enabled: true,
    preserverHtmlElements: false,
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
      'serif': ['Georgia', 'serif'],
      'mono': ['Courier New', 'Courier', 'monospace'],
    },
  },
  variants: {
    extend: {
      fontFamily: ['dark']
    },
  },
  plugins: [],
}
