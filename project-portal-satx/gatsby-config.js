// Get environment variables including secrets
require("dotenv").config({
  path: `./.env`,
})

const staticText = require("./language.json")

// General metadata for the site
const siteMetadata = {
  siteTitle: "Research Partnerships Portal",
  short_name: "Project Portal",
  siteUrl: process.env.CI ? "http://localhost:9000" : "https://satx-project-portal-preview.thepolicylab.io",
  projectInterestLink: "https://forms.office.com/pages/responsepage.aspx?id=TyGwGkqsB0Snxi7x63baxdz0AxwEGGlPjxiu18ubfUNUQk1LRlo4SjIxQzhFTzBBTEhQWUYxRkk1SC4u",
  live: false,
  locale: "en",
  pages: [
    { name: staticText.open.pageName, link: "/", show: true },
    { name: staticText.ongoing.pageName, link: "/ongoing", show: true },
    { name: staticText.completed.pageName, link: "/completed", show: true },
  ],
}

// Load the styling configuration. It's imported here as it will be used in both the theme and manifest options.
const tailwindConfig = require("./tailwind.config")

module.exports = {
  // Import the Metadata, overriding anything with defaults in the theme
  siteMetadata: siteMetadata,

  plugins: [
    {
      // Use the Project Portal Theme as the first plugin – this builds the website as a whole
      resolve: "project-portal-theme",
      options: {
        // Settings for loading project and contact data from Airtable
        airtableSettings: {
          airtablePartnerName: "San Antonio",
          airtableBaseID: process.env.AIRTABLE_BASE_ID,
          airtableAPIKey: process.env.AIRTABLE_API_KEY,
        },

        // Use the styling configuration in the theme
        tailwindConfig: tailwindConfig,

        // Load the static text from the language file
        staticText: staticText,
      },
    },
    {
      // Add metadata for creating a phone-homepage link
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.short_name,
        start_url: `/`,
        background_color: tailwindConfig.theme.extend.colors.background,
        theme_color: tailwindConfig.theme.extend.colors.primary[500],
        display: `standalone`,
        icon: "./images/icon.png",
      },
    },
    {
      // Include a Google Analytics Tag
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-W667ER3CGB"],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: "./images",
      },
    },
  ],
}
