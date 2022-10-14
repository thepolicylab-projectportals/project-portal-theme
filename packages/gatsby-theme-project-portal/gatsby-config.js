const { withDefaults } = require(`./utils/default-options`)

module.exports = (themeOptions) => {
  console.log("theme options: ", themeOptions)
  console.log("theme options with defaults: ", withDefaults(themeOptions))

  return {
    siteMetadata: {
      title: "Gatsby Theme Project Portal",
      description:
        "The Project Portal, developed by the Policy Lab at Brown University.",
      url: `http://localhost:${process.env.CI ? 9000 : process.env.PORT ?? ``}`,
      locale: "en",
      image: "/icons/icon-256x256.png",
      ongoingText:
        "We plan to post results and deliverables when the project is complete. In the meantime, we welcome questions about the project.",
      completeText:
        "We’re eager to learn how you use the results and welcome any questions.",
    },
  }
}
