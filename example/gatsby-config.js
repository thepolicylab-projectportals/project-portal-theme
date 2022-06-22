require("dotenv").config({
  path: `./.env`,
})

const staticText = require("./language.json")

const siteMetadata = {
  siteTitle: "Example Project Portal Content",
  short_name: "Project Portal",
  siteUrl: process.env.CI ? "http://localhost:9000" : "https://localhost",
  projectInterestLink: "",
  live: false,
  locale: "en",
  staticText: staticText,
}

const tailwindConfig = require("./tailwind.config")

const airtableSettings = {
  airtablePartnerName: "North Carolina",
  airtableBaseID: process.env.AIRTABLE_BASE_ID,
  airtableAPIKey: process.env.AIRTABLE_API_KEY,
}

module.exports = {
  siteMetadata: siteMetadata,
  plugins: [
    {
      resolve: "project-portal-theme",
      options: {
        siteMetadata: siteMetadata,
        airtableSettings: airtableSettings,
        tailwindConfig: tailwindConfig,
      },
    },
    {
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
