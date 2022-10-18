module.exports = {
  presets: [
    require("@thepolicylab-projectportals/gatsby-theme-project-portal/src/styles/tailwind.presets"),
  ],
  purge: {
    enabled: true,
    content: [
      "./node_modules/@thepolicylab-projectportals/gatsby-theme-project-portal/src/**/*.{js,jsx,ts,tsx,html}",
      "./src/**/*.{js,jsx,ts,tsx,html}",
    ],
  },
  theme: {
    extend: {
      colors: {
        background: "#fafafa",
        navbar: "#ECF0F3",
        rd: "#ffffff",
        footer: "#ECF0F3",
        footertext: "#092940",
        primary: "#00376D",
        primarydark: "#092940",
      },
    },
  },
}
