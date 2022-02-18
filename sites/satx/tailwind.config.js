const RUST = "#8b0b04"
const GREY = "#F7F7F7"

module.exports = {
  presets: [require("../../tailwind.config.js")],
  theme: {
    extend: {
      colors: {
        navbar: GREY,
        rd: GREY,
        footer: RUST,
        footertext: "#FFFFFF",
        primary: RUST,
        primarydark: "#4a0804",
      },
    },
  },
}
