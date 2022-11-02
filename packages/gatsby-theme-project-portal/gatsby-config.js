const { withDefaults } = require(`./utils/default-options`)

function getSiteUrl() {
  if (process.env.NETLIFY) {
    // we're running on Netlify
    switch (process.env.CONTEXT) {
      case "production":
        return process.env.URL
      case "deploy-preview":
        return process.env.DEPLOY_PRIME_URL
      case "branch-deploy":
        return process.env.DEPLOY_PRIME_URL
      case "development":
        return `http://localhost:${process.env.PORT ?? "8000"}`
      default:
        console.error(`context unknown: ${process.env.CONTEXT}`)
        process.exit(1)
    }
  } else if (process.env.CI) {
    // We're running on GitHub
    return `http://localhost:9000`
  } else {
    // We're probably running locally.
    // The user might have set a port, but if not, we need a sensible default.
    let defaultPort
    console.log(`We're probably running locally. ${process.env.NODE_ENV}`)
    switch (process.env.NODE_ENV) {
      case "development":
        defaultPort = 8000
        break
      case "production":
        defaultPort = 9000
        break
      default:
        console.warn(`NODE_ENV value unknown: ${process.env.NODE_ENV}`)
        defaultPort = 8000
    }
    return `http://localhost:${process.env.PORT ?? defaultPort}`
  }
}

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
    ],
  }
}
