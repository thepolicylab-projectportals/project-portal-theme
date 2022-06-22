// Get environment variables including secrets
require("dotenv").config({
  path: `./.env`,
})

const siteMetadata = {
  siteTitle: "Example Project Portal Content",
  short_name: "Project Portal",
  siteUrl: process.env.CI ? "http://localhost:9000" : "https://localhost",
  projectInterestLink: "",
  live: false,
  locale: "en",
}

const tailwindConfig = require("./tailwind.config")

module.exports = {
  // General metadata for the site – this overrides anything defined in the theme
  siteMetadata: siteMetadata,

  plugins: [
    {
      // Use the Project Portal Theme as the first plugin – this builds the website as a whole
      resolve: "project-portal-theme",
      options: {
        // Settings for loading project and contact data from Airtable
        airtableSettings: {
          airtablePartnerName: "North Carolina",
          airtableBaseID: process.env.AIRTABLE_BASE_ID,
          airtableAPIKey: process.env.AIRTABLE_API_KEY,
        },

        // Load the styling configuration
        tailwindConfig: tailwindConfig,

        // Load the static text from the language file
        staticText: require("./language.json"),
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
  ],
}
