const { withDefaults } = require(`./utils/default-options`)

module.exports = (themeOptions) => {
  // console.log("theme options: ", themeOptions)
  // console.log("theme options with defaults: ", withDefaults(themeOptions))
  const siteMetadata = {
    title: "Gatsby Theme Project Portal",
    description:
      "The Project Portal, developed by the Policy Lab at Brown University.",
    url: `http://localhost:${process.env.CI ? 9000 : process.env.PORT ?? ``}`,
    locale: "en",
    image: "/icons/icon-256x256.png",
  }
  const themeOptionsWithDefaults = withDefaults(themeOptions)

  return {
    siteMetadata: siteMetadata,
    plugins: [
      {
        resolve: `gatsby-plugin-postcss`,
        options: {
          postCssPlugins: [
            require("tailwindcss")(themeOptionsWithDefaults.tailwindConfig),
            require("autoprefixer"),
          ],
        },
      },
    ],
  }
}
