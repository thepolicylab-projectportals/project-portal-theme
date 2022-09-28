module.exports = (themeOptions) => {
  const siteMetadata = {
    siteTitle: "Project Portal Theme",
    siteUrl: "http://localhost:8000",
    live: false,
    pages: [
      { name: "Open opportunities", link: "/", show: true },
      { name: "In-progress projects", link: "/ongoing", show: true },
      { name: "Completed projects", link: "/completed", show: true },
      { name: "About", link: "/about", show: true },
      { name: "Contact", link: "/contact", show: true },
      { name: "Add Projects", link: "/admin/", show: true },
    ],
    locale: "en",
    staticText: themeOptions.staticText,
  }
  return {
    siteMetadata: siteMetadata,
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `content`,
          path: themeOptions.contentPath,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: themeOptions.imagePath,
        },
      },
      `gatsby-plugin-image`,
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      `gatsby-transformer-remark`,
    ],
  }
}
