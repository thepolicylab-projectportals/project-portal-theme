const { withDefaults } = require(`./utils/default-options`)

module.exports = (themeOptions) => {
  const themeOptionsWithDefaults = withDefaults(themeOptions)
  return {
    siteMetadata: {
      title: "Gatsby Theme Project Portal",
      description:
        "The Project Portal, developed by the Policy Lab at Brown University.",
      siteUrl: `http://localhost:${
        process.env.CI ? 9000 : process.env.PORT ?? ``
      }`,
      locale: "en",
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
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: themeOptionsWithDefaults.siteTitle,
          short_name: themeOptionsWithDefaults.shortTitle,
          start_url: `/`,
          background_color:
            themeOptionsWithDefaults.tailwindConfig.theme.extend.colors
              .background,
          theme_color:
            themeOptionsWithDefaults.tailwindConfig.theme.extend.colors.primary,
          display: `standalone`,
          icon: themeOptionsWithDefaults.faviconPath,
        },
      },
    ],
  }
}
