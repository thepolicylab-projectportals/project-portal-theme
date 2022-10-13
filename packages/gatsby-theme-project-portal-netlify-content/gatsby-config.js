const { withDefaults } = require("./utils/default-options")
module.exports = (pluginOptions) => {
  const pluginOptionsWithDefaults = withDefaults(pluginOptions)
  return {
    plugins: [
      `gatsby-transformer-json`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `project`,
          path: pluginOptionsWithDefaults.projectPath,
        },
      },
    ],
  }
}
