const lodash = require("lodash")

const defaultStaticText = require("./default-static-text.json")

function withDefaults(themeOptions) {
  return {
    showDevBanner: themeOptions.showDevBanner || true,
    staticText: lodash.merge(defaultStaticText, themeOptions.staticText),
    themeImageDirectory:
      themeOptions.themeImageDirectory || `${__dirname}/../src/images`,
    pages: themeOptions.pages || [
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
