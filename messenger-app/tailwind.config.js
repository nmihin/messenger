module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#ECEEF1',
          500: '#125CB1',
          700: '#023168',
        },
        neutral: {
          100: '#D9D9D9',
          500: '#82878D',
          900: '#1E1E1E',
        }
      },
      boxShadow: {
        'custom': '0px 5px 10px 2px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}