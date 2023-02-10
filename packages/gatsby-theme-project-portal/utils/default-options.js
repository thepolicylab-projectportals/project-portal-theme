const lodash = require("lodash")
const defaultStaticText = require("./default-static-text.json")

function withDefaults(themeOptions) {
  return {
    ...themeOptions,
    siteTitle: themeOptions?.siteTitle ?? `Gatsby Theme Project Portal`,
    shortTitle: themeOptions?.shortTitle ?? `Project Portal`,
    faviconPath:
      themeOptions?.faviconPath ?? `${__dirname}/../images/default-icon.png`,
    showDevBanner: themeOptions?.showDevBanner ?? true,
    staticText: lodash.merge(defaultStaticText, themeOptions?.staticText),
    themeImageDirectory:
      themeOptions?.themeImageDirectory ?? "./content/theme-image",
    pages: themeOptions?.pages ?? [
      {
        name: "Home",
        link: "/",
        show: true,
      },
    ],
    tailwindConfig:
      themeOptions?.tailwindConfig ??
      require(`${__dirname}/../src/styles/tailwind.presets`),
    // The ReCAPTCHA site key defaults to the standard example key provided by Google for the v2 recaptcha.
    // If the user wants to provide NO site key, not even the default, then they can set the themeOptions:
    // themeOptions: { recaptchaSiteKey: "" }
    // This will deactivate the contact form completely.
    recaptchaSiteKey:
      themeOptions?.recaptchaSiteKey ??
      `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`,
  }
}

module.exports = {
  withDefaults,
}
