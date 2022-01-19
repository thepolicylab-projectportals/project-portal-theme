const colors = require("tailwindcss/colors")

module.exports = {
  presets: [require("../../tailwind.config.js")],
  theme: {
    extend: {
      colors: {
        link: colors.sky,
        primary: {
          50: "#faf6f6",
          100: "#f5eded",
          200: "#e6d2d1",
          300: "#d7b7b5",
          400: "#ba827e",
          500: "#9c4c47",
          600: "#8c4440",
          700: "#753935",
          800: "#5e2e2b",
          900: "#4c2523",
        },
      },
    },
  },
}
