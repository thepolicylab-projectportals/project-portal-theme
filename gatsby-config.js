require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: "San Antonio Research Partnership Portal",
    pages: [
      { name: "Open opportunities", link: "/", show: true },
      { name: "Ongoing projects", link: "/ongoing", show: true },
      { name: "Completed projects", link: "/completed", show: false },
      { name: "About", link: "/about", show: true },
      { name: "Contact", link: "/contact", show: true },
    ],
    links: {
      contact: "mailto:contact@me.com",
      facebook: "https://www.facebook.com",
      linkedin: "https://www.linkedin.com",
      twitter: "https://www.twitter.com",
    },
    locale: "en",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require("tailwindcss"), require("autoprefixer")],
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
            tableName: process.env.AIRTABLE_TABLE_NAME,
            tableLinks: ["contacts"],
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: "Project Contacts",
            mapping: { contactImage: "fileNode" },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `San Antonio Research Partnership Portal`,
        short_name: `Project Portal`,
        start_url: `/`,
        background_color: `#fafafa`,
        theme_color: `#9c4c47`,
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
  ],
}
