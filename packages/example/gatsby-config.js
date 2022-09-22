// General metadata for the site
const siteMetadata = {
  siteTitle: "Example Project Portal Content",
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
        contentPath: `${__dirname}/content`,
      },
    },
  ],
}
