const { withDefaults } = require("./utils/default-options")
module.exports = (pluginOptions) => {
  const pluginOptionsWithDefaults = withDefaults(pluginOptions)
  return {
    plugins: [
      // Include transformers first – ensure they are available when we do the sourcing
      `gatsby-transformer-json`,
      `gatsby-plugin-image`,
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      // Now source the files
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `project`,
          path: pluginOptionsWithDefaults.projectPath,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `contact`,
          path: pluginOptionsWithDefaults.contactPath,
        },
      },
    ],
  }
}
