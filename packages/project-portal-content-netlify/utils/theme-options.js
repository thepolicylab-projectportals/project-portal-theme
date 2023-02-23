const path = require("path")

const { withDefaults } = require("./default-options")

function loadProjectPortalThemeOptions(pluginOptions) {
  const { configPath } = withDefaults(pluginOptions)
  const configAbsolutePath = path.join(process.cwd(), configPath)
  const siteMetadata = require(`${configAbsolutePath}/site-metadata.json`)
  return {
    siteMetadata: siteMetadata,
  }
}

module.exports = {
  loadProjectPortalThemeOptions,
}
