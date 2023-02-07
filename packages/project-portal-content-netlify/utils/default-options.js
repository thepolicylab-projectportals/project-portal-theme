function withDefaults(pluginOptions) {
  return {
    ...pluginOptions,
    configPath: pluginOptions.configPath || "./content/config",
    projectPath: pluginOptions.projectPath || "./content/project",
    contactPath: pluginOptions.contactPath || "./content/contact",
    topicPath: pluginOptions.topicPath || "./content/topic",
    pagePath: pluginOptions.pagePath || "./content/page",
  }
}

module.exports = {
  withDefaults,
}
