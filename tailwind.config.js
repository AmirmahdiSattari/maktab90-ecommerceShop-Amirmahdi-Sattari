/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend:
    {
      fontFamily: {
        'vazir': ['Vazirmatn', 'sans-serif'],
        'pacifico': ['Pacifico', 'sans-serif'],
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}