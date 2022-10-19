const { withDefaults } = require(`./utils/default-options`)

module.exports = (themeOptions) => {
  return {
    siteMetadata: {
      title: "Gatsby Theme Project Portal",
      description:
        "The Project Portal, developed by the Policy Lab at Brown University.",
      url: `http://localhost:${process.env.CI ? 9000 : process.env.PORT ?? ``}`,
      locale: "en",
      image: "/icons/icon-256x256.png",
    },
    plugins: [
      {
        resolve: `gatsby-plugin-postcss`,
        options: {
          postCssPlugins: [
            require("tailwindcss")(themeOptions.tailwindConfig),
            require("autoprefixer"),
          ],
        },
      },
    ],
  }
}
