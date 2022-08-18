require("ts-node").register(require("./tsconfig.json"))

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
        resolve: `gatsby-plugin-netlify-cms`,
        options: {
          enableIdentityWidget: true,
          publicPath: `admin`,
        },
      },
      {
        resolve: `gatsby-plugin-postcss`,
        options: {
          postCssPlugins: [
            require("tailwindcss")(themeOptions.tailwindConfig),
            require("autoprefixer"),
          ],
        },
      },
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sitemap`,
      `gatsby-plugin-image`,
      `@dream-bit-de/gatsby-plugin-better-page-tree`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `content`,
          path: themeOptions.contentPath,
        },
      },
      `gatsby-transformer-remark`,
    ],
    mapping: {
      'MarkdownRemark.frontmatter.contacts': `MarkdownRemark.frontmatter.id`,
    }
  }
}
