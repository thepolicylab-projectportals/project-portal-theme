const lodash = require("lodash")

const defaultStaticText = require("./default-static-text.json")

function withDefaults(themeOptions) {
  return {
    siteTitle: themeOptions.siteTitle || `Gatsby Theme Project Portal`,
    showDevBanner: themeOptions.showDevBanner || true,
    staticText: lodash.merge(defaultStaticText, themeOptions.staticText),
    pages: themeOptions.pages || [
      {
        name: "Home",
        link: "/",
        show: true,
      },
    ],
    tailwindConfig:
      themeOptions.tailwindConfig || require(`../src/styles/tailwind.presets`),
  }
}

module.exports = {
  withDefaults,
}
