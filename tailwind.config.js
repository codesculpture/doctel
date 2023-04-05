/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{tsx,js}"],
  theme: {
    colors: {
      primC: "#0099FF",
      primT: "#373D30"
    },
    extend: {
      margin: {
        "lg": "200px"
      }
    }
  },
  plugins: [],
}
