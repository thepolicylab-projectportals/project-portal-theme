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
        gray: colors.neutral,
        link: "#005EA2",
        topics: "#73B3E7",
        navbar: "#ECF0F3",
        rd: "#ffffff",
        footer: "#ECF0F3",
        footertext: "#092940",
        primary: colors.cyan[500],
        primarydark: colors.cyan[800],
        warning: colors.amber[500],
      },
      flex: {
        4: "4 4 0%",
      },
      spacing: {
        "100px": "100px",
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
      minHeight: {
        "15rem": "15rem",
      },
      minWidth: {
        "3rem": "3rem",
        "20ch": "20ch",
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
