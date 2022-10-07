exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type ProjectPortalConfig implements Node {
      contrastGuidelines: String
      CMYK: Boolean
      codeExample: Boolean
      rootFontSize: Int
    }
  `)
}

exports.sourceNodes = (
  { actions, createContentDigest },
  { contrastGuidelines = `AA`, CMYK = true, codeExample = true, rootFontSize = 16 }
) => {
  const { createNode } = actions

  const specimensConfig = {
    contrastGuidelines,
    CMYK,
    codeExample,
    rootFontSize,
  }

  createNode({
    ...specimensConfig,
    id: `@thepolicylab-projectportals/gatsby-theme-project-portal`,
    parent: null,
    children: [],
    internal: {
      type: `ProjectPortalConfig`,
      contentDigest: createContentDigest(specimensConfig),
      content: JSON.stringify(specimensConfig),
      description: `Options for @thepolicylab-projectportals/gatsby-theme-project-portal`,
    },
  })
}
