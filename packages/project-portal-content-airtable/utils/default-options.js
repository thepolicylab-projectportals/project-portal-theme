function withDefaults(pluginOptions) {
  return {
    ...pluginOptions,
    partnerName: pluginOptions.partnerName || "Example Content",
    projectsTable: pluginOptions.projectsTable || "Project Page Content",
    contactsTable: pluginOptions.contactsTable || "Project Contacts",
  }
}

module.exports = {
  withDefaults,
}
