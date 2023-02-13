const fs = require("fs")

const { withDefaults } = require(`./utils/default-options`)
const {
  projectTypeDefs,
  projectPortalConfigTypeDefs,
  contactTypeDefs,
  pageTypeDefs,
} = require(`./utils/types`)
const CardPageTemplate = require.resolve(`./src/templates/card-page`)

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
  createTypes(projectPortalConfigTypeDefs)
  createTypes(projectTypeDefs)
  createTypes(contactTypeDefs)
  createTypes(pageTypeDefs)
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
        allCardPage {
          nodes {
            slug
            filter {
              status
            }
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

  const { allCardPage } = result.data
  allCardPage.nodes.forEach((page) => {
    const { slug, filter } = page
    createPage({
      path: `/${slug}`,
      component: CardPageTemplate,
      context: {
        slug: slug,
        statusFilter: filter.status,
      },
    })
  })
}
