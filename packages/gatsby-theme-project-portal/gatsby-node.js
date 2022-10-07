exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type ProjectPortalConfig implements Node {
      siteTitle: String
    }
  `)
}

exports.sourceNodes = (
  { actions, createContentDigest },
  { siteTitle = "Project Portal Theme" }
) => {
  const { createNode } = actions

  const projectPortalConfig = {
    siteTitle,
  }

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
