/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica Neue", "Arial", "Noto Sans", "sans-serif"],
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  content: [
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./src/**/*.{js,ts,jsx,tsx}"
  ]
}
