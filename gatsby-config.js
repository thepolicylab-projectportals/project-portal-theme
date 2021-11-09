require("dotenv").config()

module.exports = {
  siteMetadata: {
    links: {
      contact: "mailto:contact@me.com",
      facebook: "https://www.facebook.com",
      linkedin: "https://www.linkedin.com",
      twitter: "https://www.twitter.com",
    },
    locale: "en",
    title: "Project portal",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
    `gatsby-plugin-react-helmet`,
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
            mapping: { contactImage: "fileNode" },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Questions from East Evidencia`,
        short_name: `Project Portal`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#4299e1`,
        display: `standalone`,
        icon: `src/images/icon.ico`,
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
