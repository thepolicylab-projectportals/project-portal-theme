function withDefaults(themeOptions) {
  return {
    ...themeOptions,
    siteTitle: themeOptions.siteTitle || `Gatsby Theme Project Portal`
  }
}

module.exports = {
  withDefaults
}
