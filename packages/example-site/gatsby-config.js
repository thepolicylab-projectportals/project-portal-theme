// General metadata for the site
const tailwindConfig = require("./tailwind.config")
const layoutConfig = require(`${__dirname}/content/config/layout.json`)
const siteMetadata = {
  title: "Project Portal Example (Site with Queries)",
}

module.exports = {
  siteMetadata: siteMetadata,
  plugins: [
    {
      resolve: `@thepolicylab-projectportals/gatsby-theme-project-portal`,
      options: {
        pages: layoutConfig.navbar.pages,
        tailwindConfig: tailwindConfig,
        staticText: layoutConfig,
        faviconPath: `${__dirname}/content/theme-image/favicon.png`,
        projectInterestLink: `https://ccv.brown.edu`,
      },
    },
    `@thepolicylab-projectportals/project-portal-content-netlify`,
    `gatsby-plugin-sitemap`,
  ],
}
