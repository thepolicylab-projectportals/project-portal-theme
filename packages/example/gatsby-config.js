// General metadata for the site
module.exports = {
  siteMetadata: {
    title: "Project Portal Example (Test Data)",
  },
  plugins: [
    `@thepolicylab-projectportals/gatsby-theme-project-portal`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
  ],
}
