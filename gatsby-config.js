require("dotenv").config({
  path: `${process.env.PP_CONFIG_BASE}.env`,
})

const {
  AIRTABLE_TABLE_PROJECTS,
  AIRTABLE_TABLE_CONTACTS,
} = require("./src/consts.js")

const language = require(`./${process.env.PP_CONFIG_BASE}language.json`)
const tailwindConfig = require(`./${process.env.PP_CONFIG_BASE}tailwind.config.js`)

module.exports = {
  siteMetadata: {
    title: language.meta.title,
    pages: [
      { name: "Open opportunities", link: "/", show: true },
      { name: "Ongoing projects", link: "/ongoing", show: true },
      { name: "Completed projects", link: "/completed", show: false },
      { name: "About", link: "/about", show: true },
      { name: "Contact", link: "/contact", show: true },
    ],
    locale: "en",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require("tailwindcss")({
            config: `${process.env.PP_CONFIG_BASE}tailwind.config.js`,
          }),
          require("autoprefixer"),
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: AIRTABLE_TABLE_PROJECTS,
            tableLinks: ["contacts"],
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: AIRTABLE_TABLE_CONTACTS,
            mapping: { contactImage: "fileNode" },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: language.meta.title,
        short_name: `Project Portal`,
        start_url: `/`,
        background_color: `#fafafa`,
        theme_color: tailwindConfig.theme.extend.colors.primary[500],
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      // This plugin allows us to also search for files in the site-specific directory set
      // in the environment variable `PP_BASE_CONFIG`.
      //
      // This allows an `import blah from "blah.json"` statement to find the blah.json file
      // in sites/<your site>/, instead of requiring that to be a relative path.
      resolve: "gatsby-plugin-root-import",
      options: {
        resolveModules: [process.env.PP_CONFIG_BASE],
      },
    },
  ],
}
