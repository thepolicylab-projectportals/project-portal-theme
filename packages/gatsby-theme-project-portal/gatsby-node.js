const { withDefaults } = require(`./utils/default-options`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type ProjectPortalConfig implements Node {
      siteTitle: String
      showDevBanner: Boolean
    }
  `)
}

exports.sourceNodes = ({ actions, createContentDigest }, themeOptions) => {
  const { createNode } = actions

  const projectPortalConfig = withDefaults(themeOptions)

  createNode({
    ...projectPortalConfig,
    id: `@thepolicylab-projectportals/gatsby-theme-project-portal`,
    parent: null,
    children: [],
    internal: {
      type: `ProjectPortalConfig`,
      contentDigest: createContentDigest(projectPortalConfig),
      content: JSON.stringify(projectPortalConfig),
      description: `Options for @thepolicylab-projectportals/gatsby-theme-project-portal`,
    },
  })
}
