/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend:
    {
      fontFamily: {
        'vazir': ['Vazirmatn', 'sans-serif'],
        'pacifico':['Pacifico','sans-serif'],  
      },
    },
  },
  plugins: [],
}