const tailwindConfig = require("./tailwind.config")
const siteMetadata = {
  title: "Project Portal Example (Test Data)",
}

// General metadata for the site
module.exports = {
  siteMetadata: siteMetadata,
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `@thepolicylab-projectportals/gatsby-theme-project-portal`,
      options: {
        tailwindConfig: tailwindConfig,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
  ],
}
