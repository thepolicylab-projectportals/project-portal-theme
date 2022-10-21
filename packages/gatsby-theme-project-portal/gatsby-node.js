const { withDefaults } = require(`./utils/default-options`)

const {
  projectTypeDefs,
  projectPortalConfigTypeDefs,
  contactTypeDefs,
} = require(`./utils/types`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(projectPortalConfigTypeDefs)
  createTypes(projectTypeDefs)
  createTypes(contactTypeDefs)
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
