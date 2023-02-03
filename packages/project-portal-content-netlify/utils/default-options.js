function withDefaults(pluginOptions) {
  return {
    ...pluginOptions,
    projectPath: pluginOptions.projectPath || "./content/project",
    contactPath: pluginOptions.contactPath || "./content/contact",
    topicPath: pluginOptions.topicPath || "./content/topic",
    sitePath: pluginOptions.sitePath || "./content/site",
    pagePath: pluginOptions.pagePath || "./content/page",
  }
}

module.exports = {
  withDefaults,
}
