/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'red-hat-display': ['RedHatDisplay-Regular', '-apple-system', 'BlinkMacSystemFont',
        '"Segoe UI"', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', '"Open Sans"', '"Helvetica Neue"',
        'sans-serif']
      },
      backgroundImage:{
        'homepage': "url('/assets/images/homepage.svg')",
        'dao-hero': 'linear-gradient(to bottom, #262747 0%, #262747 45%, #1C1D34 45%, #1C1D34 100%)',
        'profile-hero': 'linear-gradient(to bottom, #262747 0%, #262747 56%, transparent 56%, transparent 100%)',
      },
      colors: {
        'grayish-blue': '#262747',
        'dark-grayish-blue': '#1C1D34',
        orange: '#D33D00',
        'dark-orange': 'rgba(211, 61, 0, 0.6)',
        'light-gray': 'rgba(137, 129, 129, 0.3)',
        active: '#499C94',
        'active-light': '#CDFBF2',
        inactive: '#9C4949',
        'inactive-light': '#FBCDCD',
      }
    },
  },
  plugins: [],
}
