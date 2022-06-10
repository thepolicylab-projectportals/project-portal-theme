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
        background: "#fafafa",
        navbar: "#ECF0F3",
        rd:  "#ffffff",
        footer: "#ECF0F3",
        footertext: "#092940",
        primary: "#00376D",
        primarydark: "#092940",
      },
    },
  },
}
