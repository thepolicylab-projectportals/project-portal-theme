const THEME_BLUE = "#00376D"
const DARK_BLUE = "#092940"
const LIGHT_BLUE = "#ECF0F3"
const WHITE = "#ffffff"

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
        tailwindConfig: {
          theme: {
            extend: {
              colors: {
                navbar: LIGHT_BLUE,
                  rd: WHITE,
                  footer: LIGHT_BLUE,
                  footertext: DARK_BLUE,
                  primary: THEME_BLUE,
                  primarydark: DARK_BLUE,
              },
            },
          },
        }
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
