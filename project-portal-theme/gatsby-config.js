const path = require("path")


const {
  AIRTABLE_TABLE_PROJECTS,
  AIRTABLE_TABLE_CONTACTS,
} = require("./src/consts.js")


const language = require("./src/language.json")


module.exports = themeOptions => {
  return {
    siteMetadata: {
      title: "Project Portal Theme",
      siteUrl: "http://localhost:8000",
      live: false,
      pages: [
        { name: language.open.pageName, link: "/", show: true },
        { name: language.ongoing.pageName, link: "/ongoing", show: true },
        { name: language.completed.pageName, link: "/completed", show: true },
        { name: "About", link: "/about", show: true },
        { name: "Contact", link: "/contact", show: true },
      ],
      locale: "en"
    },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: themeOptions.airtableSettings.airtableAPIKey,
        tables: [
          {
            baseId: themeOptions.airtableSettings.airtableBaseID,
            tableName: AIRTABLE_TABLE_PROJECTS,
            tableLinks: ["contacts"],
          },
          {
            baseId: themeOptions.airtableSettings.airtableBaseID,
            tableName: AIRTABLE_TABLE_CONTACTS,
            mapping: { contactImage: "fileNode" },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: themeOptions.siteMetadata.title,
        short_name: themeOptions.siteMetadata.short_name,
        start_url: `/`,
        background_color: themeOptions.tailwindConfig.theme.extend.colors.background,
        theme_color: themeOptions.tailwindConfig.theme.extend.colors.primary[500],
        display: `standalone`,
        icon: path.join(
          __dirname,
          "site",
          "images",
          "icon.png"
        ),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, "site", "images"),
      },
    },
    {
      // This plugin allows us to also search for files in the site-specific directory set
      // in the environment variable `PP_BASE_CONFIG`.
      //
      // This allows an `import blah from "site/blah.json"` statement to find the blah.json file
      // in sites/<your site>/.
      resolve: "gatsby-plugin-root-import",
      options: {
        site: path.join(__dirname, "site"),
      },
    }
  ]
}}
