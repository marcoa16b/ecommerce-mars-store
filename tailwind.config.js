module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
    colors: {
      'textPrimary': '#0C0604',
      'textSecondary': '#BCBCBB',
      'marsDark': '#604531',
      'marsClare': '#D2643C',
      'clareBg': '#EFD3BF',
      'DarkColor': '#48332F',
      // Nueva paleta
      'ClarePurple': '#DCB3F5',
      'ClareRose': '#FC5BF3',
      'SimpleRed': '#E65F79',
      'SimpleOrange': '#FC745B',
      'ClareOrange': '#F29157',
      'White': '#fff',
      'Black': '#000',
      'Purple': '#9c27b0',
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded']
  }
}
