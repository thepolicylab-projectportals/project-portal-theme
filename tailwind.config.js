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
        link: "#005EA2",
        policyareas: "#73B3E7",
        primary: colors.cyan,
      },
      fontSize: {
        xxs: "0.625rem",
        h1: "3.5rem",
        h2: ["2.75rem", "3rem"],
        h3: ["2rem", "2.25rem"],
        h3mobile: ["1.5rem", "1.75rem"],
        h4: "1.25rem",
        body: "1.10rem",
        button: "1.0625rem",
        nav: "1.0625rem",
        contact: "1.0625rem",
        tag: "0.875rem",
      },
      maxHeight: {
        48: "12rem",
        "80vh": "80vh",
        "90vh": "90vh",
        none: "none",
      },
      lineHeight: {
        snug: "1.15",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
}
