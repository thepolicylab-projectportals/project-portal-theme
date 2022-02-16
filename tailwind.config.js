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
        topics: "#73B3E7",
        primary: colors.cyan,
      },
      fontSize: {
        h1: ["2.5rem", "2.75rem"],
        h2: ["2rem", "2.25rem"],
        h3: ["1.5rem", "1.75rem"],
        h4: "1rem",
        body: "1rem",
        button: "0.875rem",
        nav: "0.875rem",
        contact: "1rem",
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
