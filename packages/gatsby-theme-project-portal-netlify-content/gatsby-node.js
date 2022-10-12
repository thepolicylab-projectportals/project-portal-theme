// constants for your GraphQL Project and Contact types
const PROJECT_NODE_TYPE = `Project`
const projectTypeDefs = `
    type ${PROJECT_NODE_TYPE} implements Node {
      slug: String!
      description: String
    }
  `

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions

  const data = {
    projects: [
      { slug: "hello-world-project", description: `Hello world!` },
      { slug: "second-project", description: `Second project!` },
      { slug: "third-project" },
    ],
  }

  // loop through data and create Gatsby nodes
  data.projects.forEach((project) =>
    createNode({
      ...project,
      id: createNodeId(`${PROJECT_NODE_TYPE}-${project.slug}`),
      parent: null,
      children: [],
      internal: {
        type: PROJECT_NODE_TYPE,
        contentDigest: createContentDigest(project),
      },
    })
  )
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(projectTypeDefs)
}
