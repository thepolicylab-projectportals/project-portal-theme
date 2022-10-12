function withDefaults(themeOptions) {
  return {
    ...themeOptions,
    showDevBanner: themeOptions.showDevBanner || true,
  }
}

module.exports = {
  withDefaults,
}
