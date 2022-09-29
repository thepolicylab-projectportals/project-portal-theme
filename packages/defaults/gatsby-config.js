const staticText = require("./language.json")

// General metadata for the site
const siteMetadata = {
  siteTitle: "Default Project Portal Content",
  short_name: "Project Portal",
  siteUrl: process.env.CI ? "http://localhost:9000" : "https://localhost",
  projectInterestLink: "",
  live: false,
  locale: "en",
}

module.exports = {
  siteMetadata: siteMetadata,

  plugins: [
    {
      resolve: `@thepolicylab-projectportals/gatsby-theme-project-portal`,
      options: {
        staticText: staticText,
        contentPath: `${__dirname}/content`,
        imagePath: `${__dirname}/content/images`,
      },
    },
  ],
}
