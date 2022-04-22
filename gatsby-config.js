require("dotenv").config({
  path: `${process.env.PP_CONFIG_BASE}.env`,
})

const path = require("path")

const {
  AIRTABLE_TABLE_PROJECTS,
  AIRTABLE_TABLE_CONTACTS,
} = require("./src/consts.js")

const meta = require(`./${process.env.PP_CONFIG_BASE}meta.json`)
const language = require(`./${process.env.PP_CONFIG_BASE}language.json`)
const tailwindConfig = require(`./${process.env.PP_CONFIG_BASE}tailwind.config.js`)

const plugins = [
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
  `gatsby-plugin-sitemap`,
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
      name: meta.title,
      short_name: `Project Portal`,
      start_url: `/`,
      background_color: `#fafafa`,
      theme_color: tailwindConfig.theme.extend.colors.primary[500],
      display: `standalone`,
      icon: path.join(
        __dirname,
        process.env.PP_CONFIG_BASE,
        "images",
        "icon.png"
      ),
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: path.join(__dirname, process.env.PP_CONFIG_BASE, "images"),
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
      site: path.join(__dirname, process.env.PP_CONFIG_BASE),
    },
  },
]

// If a Google Analytics tag is present, add it to the build
if (meta.gtag) {
  plugins.push({
    resolve: `gatsby-plugin-google-gtag`,
    options: {
      trackingIds: [meta.gtag],
      gtagConfig: {
        anonymize_ip: true,
      },
      pluginConfig: {
        head: true,
        respectDNT: true,
      },
    },
  })
}

module.exports = {
  siteMetadata: {
    siteUrl: process.env.CI ? "http://localhost:9000" : meta.url,
    title: meta.title,
    pages: [
      { name: language.open.pageName, link: "/", show: true },
      { name: language.ongoing.pageName, link: "/ongoing", show: true },
      { name: language.completed.pageName, link: "/completed", show: true },
      { name: "About", link: "/about", show: true },
      { name: "Contact", link: "/contact", show: true },
    ],
    locale: "en",
  },
  plugins: plugins,
}
