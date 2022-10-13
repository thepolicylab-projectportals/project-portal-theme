const { withDefaults } = require("./utils/default-options")
module.exports = (pluginOptions) => {
  pluginOptionsWithDefaults = withDefaults(pluginOptions)
  return {
    plugins: [
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
