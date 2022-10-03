module.exports = {
  siteMetadata: {
    title: "Project Portal Example Site (SiteMetadata: Title)",
    pages: [
      { name: "Open opportunities", link: "/", show: true },
      { name: "In-progress projects", link: "/ongoing", show: true },
      { name: "Completed projects", link: "/completed", show: true },
      { name: "About", link: "/about", show: true },
      { name: "Contact", link: "/contact", show: true },
      { name: "Add Projects", link: "/admin/", show: true },
    ],
  },
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
