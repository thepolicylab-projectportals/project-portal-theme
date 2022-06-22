const RUST = "#8b0b04"
const GREY = "#F7F7F7"
const BROWN = "#382C2B"
const WHITE = "#FFFFFF"

module.exports = {
  presets: [require("../project-portal-theme/tailwind.presets")],
  purge: {
    enabled: true,
    content: [
      "./src/**/*.{js,jsx,ts,tsx,html}",
      "../project-portal-theme/src/**/*.{js,jsx,ts,tsx,html}"
    ],
  },
  theme: {
    extend: {
      colors: {
        navbar: GREY,
        rd: GREY,
        footer: BROWN,
        footertext: WHITE,
        primary: RUST,
        primarydark: "#4a0804",
      },
    },
  },
}
