// General metadata for the site
const siteMetadata = {
  title: "Research Partnerships Portal",
  short_name: "Project Portal",
  siteUrl: process.env.CI
    ? "http://localhost:9000"
    : "https://satx-project-portal-preview.thepolicylab.io",
  projectInterestLink:
    "https://forms.office.com/pages/responsepage.aspx?id=TyGwGkqsB0Snxi7x63baxdz0AxwEGGlPjxiu18ubfUNUQk1LRlo4SjIxQzhFTzBBTEhQWUYxRkk1SC4u",
  live: false,
  locale: "en",
}

module.exports = {
  siteMetadata: siteMetadata,
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
  ],
}
