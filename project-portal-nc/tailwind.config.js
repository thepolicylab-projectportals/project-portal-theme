const DARK_BLUE = "#092940"
const LIGHT_BLUE = "#ECF0F3"

module.exports = {
  presets: [require("../project-portal-theme/src/styles/tailwind.presets")],
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
