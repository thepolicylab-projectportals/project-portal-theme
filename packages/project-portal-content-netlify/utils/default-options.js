function withDefaults(pluginOptions) {
  return {
    ...pluginOptions,
    configPath: pluginOptions?.configPath || "./content/config",
    projectPath: pluginOptions?.projectPath || "./content/project",
    contactPath: pluginOptions?.contactPath || "./content/contact",
    topicPath: pluginOptions?.topicPath || "./content/topic",
    cardPagePath: pluginOptions?.cardPagePath || "./content/card-page",
    pagePath: pluginOptions?.pagePath || "./content/page",
    imagePath: pluginOptions?.imagePath || "./content/image",
  }
}

module.exports = {
  withDefaults,
}
