module.exports = {
  siteMetadata: {
    title: "Project Portal Theme",
    pages: [{ name: "Home", link: "/", show: true }],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `themeImages`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
  ],
}
