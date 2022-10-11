// General metadata for the site
const siteMetadata = {
  siteTitle: "Gatsby Theme Project Portal",
  short_name: "Project Portal",
  siteUrl: process.env.CI ? "http://localhost:9000" : "https://localhost",
  live: false,
  locale: "en",
  pages: [{ name: "Home", link: "/", show: true }],
}

module.exports = {
  siteMetadata: siteMetadata,
  plugins: [
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
