// General metadata for the site
const tailwindConfig = require("./tailwind.config")
const {
  loadProjectPortalThemeOptions,
} = require("@thepolicylab-projectportals/project-portal-content-netlify/utils/theme-options")
const { siteMetadata, themeOptions } = loadProjectPortalThemeOptions()

module.exports = {
  siteMetadata: siteMetadata,
  plugins: [
    {
      resolve: `@thepolicylab-projectportals/gatsby-theme-project-portal`,
      options: {
        ...themeOptions,
        tailwindConfig: tailwindConfig,
        faviconPath: `${__dirname}/content/theme-image/favicon.png`,
      },
    },
    `@thepolicylab-projectportals/project-portal-content-netlify`,
  ],
}
