module.exports = {
  presets: [require("../../tailwind.config.js")],
  theme: {
    extend: {
      colors: {
        navbar: "#F7F7F7",
        rd: "#F7F7F7",
        footer: "#8b0b04",
        footer_text: "#FFFFFF",
        primary: {
          50: "#faf6f6",
          100: "#f5eded",
          200: "#e6d2d1",
          300: "#d7b7b5",
          400: "#ba827e",
          500: "#8b0b04",
          600: "#8c4440",
          700: "#753935",
          800: "#4a0804",
          900: "#4c2523",
        },
      },
    },
  },
}
