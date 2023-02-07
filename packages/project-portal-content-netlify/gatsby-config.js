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
          modulePath: `${__dirname}/src/cms/cms.js`,
          manualInit: true,
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
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `topic`,
          path: pluginOptionsWithDefaults.topicPath,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `page`,
          path: pluginOptionsWithDefaults.pagePath,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `config`,
          path: pluginOptionsWithDefaults.configPath,
        },
      },
    ],
  }
}
