const fs = require("fs")

const {
  PROJECT_NODE_TYPE,
} = require("@thepolicylab-projectportals/gatsby-theme-project-portal/utils/types")
const { withDefaults } = require("./utils/default-options")

exports.onPreBootstrap = ({ reporter }, pluginOptions) => {
  console.log(withDefaults(pluginOptions))
  const { projectPath } = withDefaults(pluginOptions)

  if (!fs.existsSync(projectPath)) {
    reporter.info(`creating the ${projectPath} directory`)
    fs.mkdirSync(projectPath, { recursive: true })
  }
}

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions
  const projectJSONNodes = getNodesByType("ProjectJson")
  console.log(projectJSONNodes)

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
