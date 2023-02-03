// General metadata for the site
const tailwindConfig = require("./tailwind.config")
const siteMetadata = {
  title: "Project Portal Example (Site with Queries)",
}

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
        faviconPath: `${__dirname}/content/theme-image/favicon.png`,
        projectInterestLink: `https://ccv.brown.edu`,
      },
    },
    `@thepolicylab-projectportals/project-portal-content-netlify`,
  ],
}
