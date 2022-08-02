require("ts-node").register(require("./tsconfig.json"))

const {
  AIRTABLE_TABLE_PROJECTS,
  AIRTABLE_TABLE_CONTACTS,
} = require("./src/consts.js")

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
      { name: "Netlify", link: "/admin/", show: true },
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
      `gatsby-plugin-image`,
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sitemap`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: "./images",
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `ExampleContent`,
          path: `${__dirname}/ExampleContent`,
        },
      },
      `gatsby-transformer-remark`,
    ],
  }
}
