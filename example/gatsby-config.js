module.exports = {
  siteMetadata: {
    title: "Example Project Portal Content",
    url: process.env.CI ? "http://localhost:9000" : "https://localhost",
    live: false,
    gtag: ""
  },
  plugins: [
    {
      resolve: "project-portal-theme",
      options: {
        title: "Example Project Portal",
        airtablePartnerName: "Example content",
        projectInterestLink: ""
      }
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
    }
  ]
}
