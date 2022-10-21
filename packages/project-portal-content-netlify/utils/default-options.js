function withDefaults(pluginOptions) {
  return {
    ...pluginOptions,
    projectPath: pluginOptions.projectPath || "./content/project",
    contactPath: pluginOptions.contactPath || "./content/contact",
    contactImagePath: pluginOptions.contactImagePath || "./content/asset",
  }
}

module.exports = {
  withDefaults,
}
