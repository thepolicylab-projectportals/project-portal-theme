function withDefaults(pluginOptions) {
  return {
    ...pluginOptions,
    projectPath: pluginOptions.projectPath || "./content/project",
    contactPath: pluginOptions.contactPath || "./content/contact",
  }
}

module.exports = {
  withDefaults,
}
