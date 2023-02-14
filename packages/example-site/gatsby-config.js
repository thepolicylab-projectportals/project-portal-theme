// General metadata for the site
const tailwindConfig = require("./tailwind.config")
const {
  loadProjectPortalThemeOptions,
} = require("@thepolicylab-projectportals/project-portal-content-netlify/utils/theme-options")
const { siteMetadata } = loadProjectPortalThemeOptions()

module.exports = {
  siteMetadata: siteMetadata,
  plugins: [
    {
      resolve: `@thepolicylab-projectportals/gatsby-theme-project-portal`,
      options: {
        pages: [
          {
            name: "Landing Page",
            link: "/",
            show: true,
          },
        ],
        tailwindConfig: tailwindConfig,
        staticText: {
          bottom_banner: {
            text: "This is the Project Portal site footer text.",
          },
        },
        faviconPath: `${__dirname}/content/theme-image/favicon.png`,
        projectInterestLink: `https://ccv.brown.edu`,
      },
    },
    `@thepolicylab-projectportals/project-portal-content-netlify`,
  ],
}
