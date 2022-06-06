const DARK_BLUE = "#092940"
const LIGHT_BLUE = "#ECF0F3"

module.exports = {
  presets: [require("../tailwind.config.js")],
  theme: {
    extend: {
      colors: {
        navbar: LIGHT_BLUE,
        rd: "#ffffff",
        footer: LIGHT_BLUE,
        footertext: DARK_BLUE,
        primary: "#00376D",
        primarydark: DARK_BLUE,
      },
    },
  },
}
