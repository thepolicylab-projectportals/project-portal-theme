function withDefaults(pluginOptions) {
  return {
    ...pluginOptions,
    partnerName: pluginOptions.partnerName || "Example Content",
    projectTable: pluginOptions.projectTable || "Project Page Content",
    contactTable: pluginOptions.contactTable || "Project Contacts",
  }
}

module.exports = {
  withDefaults,
}
