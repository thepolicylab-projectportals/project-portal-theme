module.exports = {
  plugins: [
    {
      resolve: `@thepolicylab-projectportals/gatsby-theme-project-portal`,
      options: {
        siteTitle: `Project Portal Example (Test Data)`
      }
    },
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
