// constants for your GraphQL Project and Contact types
const PROJECT_NODE_TYPE = `Project`

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions

  const data = {
    projects: [
      { id: 1, description: `Hello world!` },
      { id: 2, description: `Second post!` },
    ],
  }

  // loop through data and create Gatsby nodes
  data.projects.forEach((project) =>
    createNode({
      ...project,
      id: createNodeId(`${PROJECT_NODE_TYPE}-${project.id}`),
      parent: null,
      children: [],
      internal: {
        type: PROJECT_NODE_TYPE,
        contentDigest: createContentDigest(project),
      },
    })
  )
}
