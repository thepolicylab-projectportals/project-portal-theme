const path = require("path")

const { withDefaults } = require("./default-options")

function loadProjectPortalThemeOptions(pluginOptions) {
  const { configPath } = withDefaults(pluginOptions)
  const configAbsolutePath = path.join(process.cwd(), configPath)
  const siteMetadata = require(`${configAbsolutePath}/site-metadata.json`)
  const layoutOptions = require(`${configAbsolutePath}/layout.json`)
  const mainContactConfig = require(`${configAbsolutePath}/main-contact.json`)
  const themeOptions = {
    staticText: {
      navbar: layoutOptions.navbar,
      footer: layoutOptions.footer,
      bottomBanner: layoutOptions.bottomBanner,
      mainContact: {
        ongoingText: mainContactConfig.ongoingText,
        completeText: mainContactConfig.completeText,
      },
    },
    showDevBanner: layoutOptions.showDevBanner,
    projectInterestLink: mainContactConfig.projectInterestLink,
    newsletter: mainContactConfig.newsletter,
  }

  return {
    siteMetadata: siteMetadata,
    themeOptions: themeOptions,
  }
}

module.exports = {
  loadProjectPortalThemeOptions,
}
