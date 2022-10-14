function withDefaults(themeOptions) {
  return {
    ...themeOptions,
    showDevBanner: themeOptions.showDevBanner || true,
    projectInterestLink: themeOptions.projectInterestLink || true,
  }
}

module.exports = {
  withDefaults,
}
