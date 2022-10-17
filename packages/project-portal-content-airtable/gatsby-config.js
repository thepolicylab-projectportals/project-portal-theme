const { withDefaults } = require("./utils/default-options")
module.exports = (pluginOptions) => {
  const pluginOptionsWithDefaults = withDefaults(pluginOptions)
  return {
    plugins: [
      {
        resolve: `gatsby-source-airtable`,
        options: {
          apiKey: process.env.AIRTABLE_API_KEY,
          tables: [
            {
              baseId: process.env.AIRTABLE_BASE_ID,
              queryName: "Project",
              tableName: pluginOptionsWithDefaults.projectsTable,
              separateNodeType: true,
            },
            {
              baseId: process.env.AIRTABLE_BASE_ID,
              queryName: "Contact",
              tableName: pluginOptionsWithDefaults.contactsTable,
              mapping: { contactImage: "fileNode" },
              separateNodeType: true,
            },
          ],
        },
      },
    ],
  }
}
