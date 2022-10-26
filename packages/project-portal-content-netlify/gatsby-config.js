const { withDefaults } = require("./utils/default-options")
module.exports = (pluginOptions) => {
  const pluginOptionsWithDefaults = withDefaults(pluginOptions)
  return {
    plugins: [
      `gatsby-transformer-json`,
      {
        resolve: `gatsby-plugin-netlify-cms`,
        options: {
          enableIdentityWidget: true,
          publicPath: `admin`,
        },
      },
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
