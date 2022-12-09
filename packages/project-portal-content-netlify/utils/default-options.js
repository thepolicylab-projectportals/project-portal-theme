function withDefaults(pluginOptions) {
  return {
    ...pluginOptions,
    projectPath: pluginOptions.projectPath || "./content/project",
    contactPath: pluginOptions.contactPath || "./content/contact",
    topicPath: pluginOptions.topicPath || "./content/topic",
  }
}

module.exports = {
  withDefaults,
}
