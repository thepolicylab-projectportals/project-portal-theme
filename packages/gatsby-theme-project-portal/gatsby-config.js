const { withDefaults } = require(`./utils/default-options`)
const { getSiteUrl } = require(`./utils/getSiteUrl`)

module.exports = (themeOptions) => {
  const themeOptionsWithDefaults = withDefaults(themeOptions)
  return {
    siteMetadata: {
      title: "Gatsby Theme Project Portal",
      description:
        "The Project Portal, developed by the Policy Lab at Brown University.",
      siteUrl: getSiteUrl(),
      locale: "en",
      image: "/icons/icon-256x256.png",
    },
    plugins: [
      `gatsby-plugin-image`,
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `themeImages`,
          path: themeOptionsWithDefaults.themeImageDirectory,
        },
      },
      {
        resolve: `gatsby-plugin-postcss`,
        options: {
          postCssPlugins: [
            require("tailwindcss")(themeOptionsWithDefaults.tailwindConfig),
            require("autoprefixer"),
          ],
        },
      },
      `gatsby-plugin-sitemap`,
      {
        resolve: "gatsby-plugin-robots-txt",
        options: {
          resolveEnv: () => process.env.NETLIFY_ENV ?? process.env.NODE_ENV,
          env: {
            production: {
              policy: [{ userAgent: "*" }],
            },
            "branch-deploy": {
              policy: [{ userAgent: "*", disallow: ["/"] }],
              sitemap: null,
              host: null,
            },
            "deploy-preview": {
              policy: [{ userAgent: "*", disallow: ["/"] }],
              sitemap: null,
              host: null,
            },
          },
        },
      },
    ],
  }
}
