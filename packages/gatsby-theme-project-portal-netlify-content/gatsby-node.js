const {
  PROJECT_NODE_TYPE,
} = require("@thepolicylab-projectportals/gatsby-theme-project-portal/utils/types")

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
      {
        slug: "fourth-project",
        lastModified: "2022-10-12",
        startDate: "2022-10-13",
      },
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
        type: `${PROJECT_NODE_TYPE}`,
        contentDigest: createContentDigest(project),
      },
    })
  )
}
