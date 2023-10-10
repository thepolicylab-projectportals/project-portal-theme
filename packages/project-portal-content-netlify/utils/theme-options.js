const path = require("path")

const { withDefaults } = require("./default-options")

function loadProjectPortalThemeOptions(pluginOptions) {
  const { configPath } = withDefaults(pluginOptions)
  const configAbsolutePath = path.join(process.cwd(), configPath)
  const siteMetadata = require(`${configAbsolutePath}/site-metadata.json`)
  const layoutOptions = require(`${configAbsolutePath}/layout.json`)
  const mainContactConfig = require(`${configAbsolutePath}/main-contact.json`)
  const themeOptions = {
    pages: layoutOptions.navbar.pages,
    staticText: {
      footer: layoutOptions.footer,
      bottom_banner: layoutOptions.bottomBanner,
      mainContactText: {
        ongoingText: mainContactConfig.ongoingText,
        completeText: mainContactConfig.completeText,
      },
    },
    showDevBanner: layoutOptions.showDevBanner,
    projectInterestLink: mainContactConfig.projectInterestLink,
  }

  return {
    siteMetadata: siteMetadata,
    themeOptions: themeOptions,
  }
}

module.exports = {
  loadProjectPortalThemeOptions,
}
