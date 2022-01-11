const colors = require("tailwindcss/colors")

module.exports = {
  presets: [require("../../tailwind.config.js")],
  theme: {
    extend: {
      colors: {
        blue: colors.fuchsia,
      },
    },
  },
}
