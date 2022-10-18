module.exports = {
  presets: [
    require("@thepolicylab-projectportals/gatsby-theme-project-portal/src/styles/tailwind.presets"),
  ],
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "../packages/gatsby-theme-project-portal/src/**/*.{js,jsx,ts,tsx,html}",
    // "/Users/aomar7/WebstormProjects/project-portal-theme_new/packages/gatsby-theme-project-portal/src/**/*.{js,jsx,ts,tsx,html}",
    "../node_modules/@thepolicylab-projectportals/gatsby-theme-project-portal/src/**/*.{js,jsx,ts,tsx,html}",
  ],
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
