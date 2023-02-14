function withDefaults(pluginOptions) {
  return {
    ...pluginOptions,
    projectPath: pluginOptions.projectPath || "./content/project",
    contactPath: pluginOptions.contactPath || "./content/contact",
    topicPath: pluginOptions.topicPath || "./content/topic",
    cardPagePath: pluginOptions.cardPagePath || "./content/card-page",
    pagePath: pluginOptions.pagePath || "./content/page",
  }
}

module.exports = {
  withDefaults,
}
