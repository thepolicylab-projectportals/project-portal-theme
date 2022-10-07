const { withDefaults } = require(`./utils/default-options`)

module.exports = (themeOptions) => {
  console.log("theme options: ", themeOptions)
  console.log("theme options with defaults: ", withDefaults(themeOptions))
}
