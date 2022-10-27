const lodash = require("lodash")

const defaultStaticText = require("./default-static-text.json")

function withDefaults(themeOptions) {
  return {
    siteTitle: themeOptions.siteTitle || `Gatsby Theme Project Portal`,
    showDevBanner: themeOptions.showDevBanner || true,
    staticText: lodash.merge(defaultStaticText, themeOptions.staticText),
    themeImageDirectory:
      themeOptions.themeImageDirectory || "./content/theme-image",
    pages: themeOptions.pages || [
      {
        name: "Home",
        link: "/",
        show: true,
      },
    ],
    tailwindConfig:
      themeOptions.tailwindConfig || require(`../src/styles/tailwind.presets`),
    recaptchaSiteKey:
      themeOptions.recaptchaSiteKey ||
      `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`,
  }
}

module.exports = {
  withDefaults,
}
