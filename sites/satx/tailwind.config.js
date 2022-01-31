const colors = require("tailwindcss/colors")

module.exports = {
  presets: [require("../../tailwind.config.js")],
  theme: {
    extend: {
      colors: {
        policyareas: {
          200: "#73B3E7",
        },
        link: colors.sky,
        primary: {
          50: "#faf6f6",
          100: "#f5eded",
          200: "#e6d2d1",
          300: "#d7b7b5",
          400: "#ba827e",
          500: "#8b0b04",
          600: "#8c4440",
          700: "#753935",
          800: "#4a0804",
          900: "#4c2523",
        },
      },
    },
  },
}
