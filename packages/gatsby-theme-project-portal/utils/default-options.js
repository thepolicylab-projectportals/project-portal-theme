function withDefaults(themeOptions) {
  return {
    ...themeOptions,
    siteTitle: themeOptions.siteTitle || `Gatsby Theme Project Portal`,
    showDevBanner: themeOptions.showDevBanner || true,
  }
}

module.exports = {
  withDefaults,
}
