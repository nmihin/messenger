module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#ECEEF1',  // Light blue-gray
          500: '#125CB1',   // Primary blue
          700: '#023168',   // Dark blue
        },
        neutral: {
          100: '#D9D9D9',   // Light gray (your button color)
          500: '#82878D',   // Medium gray
          900: '#1E1E1E',   // Dark gray/black
        }
      }
    },
  },
  plugins: [],
}