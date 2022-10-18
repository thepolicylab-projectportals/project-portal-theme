const path = require("path")

// Get the `main` file listed in the theme's package.json.
// This should (hopefully) find the right directory with node_modules,
// as well as with the yarn berry unpacking approach.
const themeMainFile = require.resolve(
  `@thepolicylab-projectportals/gatsby-theme-project-portal`
)
console.log("theme main file: ", themeMainFile)

// Get the path to the theme's directory, without a trailing slash
const themeDirectory = path.dirname(themeMainFile)
console.log("theme directory: ", themeDirectory)

module.exports = {
  presets: [
    require("@thepolicylab-projectportals/gatsby-theme-project-portal/src/styles/tailwind.presets"),
  ],
  content: [
    // The theme components
    themeDirectory + "/src/**/*.{js,jsx,ts,tsx,html}",
    // The local src components
    "./src/**/*.{js,jsx,ts,tsx,html}",
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
