// postcss.config.js

module.exports = {
  plugins: {
    tailwindcss: {
      config: require("@thepolicylab-projectportals/gatsby-theme-project-portal/src/styles/tailwind.presets.js"),
    },
    autoprefixer: {},
  },
}
