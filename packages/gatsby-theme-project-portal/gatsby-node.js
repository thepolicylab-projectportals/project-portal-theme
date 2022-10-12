const { withDefaults } = require(`./utils/default-options`)

const {
  projectTypeDefs,
  projectPortalConfigTypeDefs,
} = require(`./utils/types`)

console.log("project type defs:", projectTypeDefs)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(projectPortalConfigTypeDefs)
  createTypes(projectTypeDefs)
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
