const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["./src/**/*.jsx", "./src/**/*.js", "./src/**/*.tsx", "./src/**/*.ts"],
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
        blue: colors.lightBlue,
        rust: {
          50: "#faf6f6",
          100: "#f5eded",
          200: "#e6d2d1",
          300: "#d7b7b5",
          400: "#ba827e",
          500: "#9c4c47",
          600: "#8c4440",
          700: "#753935",
          800: "#5e2e2b",
          900: "#4c2523",
        },
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
  plugins: [],
}
