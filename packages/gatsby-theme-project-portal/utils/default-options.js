const lodash = require("lodash")

const defaultStaticText = require("./default-static-text.json")

function withDefaults(themeOptions) {
  return {
    ...themeOptions,
    showDevBanner: themeOptions.showDevBanner || true,
    staticText: lodash.merge(defaultStaticText, themeOptions.staticText),
    pages: [
      {
        name: "Home",
        link: "/",
        show: true,
      },
    ],
  }
}

module.exports = {
  withDefaults,
}
