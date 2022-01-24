const colors = require("tailwindcss/colors")

module.exports = {
  purge: {
    enabled: true,
    content: [
      "./src/**/*.jsx",
      "./src/**/*.js",
      "./src/**/*.tsx",
      "./src/**/*.ts",
    ],
    safelist: ["bg-supportneeded-200", "bg-policyareas-200"],
  },
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
    },
    fontFamily: {
      sans: ["Public Sans", "Roboto", "system-ui", "sans-serif"],
    },
    extend: {
      colors: {
        gray: colors.trueGray,
        link: colors.blueGray,
        policyareas: colors.sky,
        supportneeded: colors.purple,
        primary: colors.cyan,
      },
      fontSize: {
        xxs: "0.625rem",
      },
      maxHeight: {
        48: "12rem",
        "80vh": "80vh",
        "90vh": "90vh",
        none: "none",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
}
