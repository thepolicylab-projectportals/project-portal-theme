// General metadata for the site
module.exports = {
  siteMetadata: {
    title: "Project Portal Example (Test Data)",
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `@thepolicylab-projectportals/gatsby-theme-project-portal`,
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
