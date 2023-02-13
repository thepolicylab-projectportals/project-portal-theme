const { withDefaults } = require(`./utils/default-options`)
const { typeDefs, CONFIG_NODE_TYPE } = require(`./utils/types`)
const fs = require("fs")

exports.onPreBootstrap = ({ reporter }, themeOptions) => {
  const { themeImageDirectory } = withDefaults(themeOptions)
  const paths = [themeImageDirectory]

  paths.forEach((path) => {
    if (!fs.existsSync(path)) {
      reporter.info(`creating the ${path} directory`)
      fs.mkdirSync(path, { recursive: true })
    }
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(typeDefs)
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
      type: `${CONFIG_NODE_TYPE}`,
      contentDigest: createContentDigest(projectPortalConfig),
      content: JSON.stringify(projectPortalConfig),
      description: `Options for @thepolicylab-projectportals/gatsby-theme-project-portal`,
    },
  })
}

const ProjectDetailPageTemplate = require.resolve(
  `./src/templates/project-detail-page`
)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      query {
        allProject {
          nodes {
            slug
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(result.errors)
  }

  // Create Posts and Post pages.
  const { allProject } = result.data
  const projects = allProject.nodes

  // Create a page for each Post
  projects.forEach((project) => {
    const { slug } = project
    createPage({
      path: `project/${slug}`,
      component: ProjectDetailPageTemplate,
      context: {
        slug: slug,
      },
    })
  })
}
