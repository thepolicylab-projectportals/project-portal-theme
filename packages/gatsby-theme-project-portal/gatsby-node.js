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
const CardPageTemplate = require.resolve(`./src/templates/card-page`)
const AboutPageTemplate = require.resolve(`./src/templates/about-page`)
const ContactPageTemplate = require.resolve(`./src/templates/contact-page`)
const ThankYouPageTemplate = require.resolve(`./src/templates/thank-you-page`)

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
        cardPages: allPage(filter: { templateKey: { eq: "CardPage" } }) {
          nodes {
            slug
            filter {
              status
            }
          }
        }
        aboutPages: allPage(filter: { templateKey: { eq: "AboutPage" } }) {
          nodes {
            slug
          }
        }
        contactPages: allPage(filter: { templateKey: { eq: "ContactPage" } }) {
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

  const { allProject, cardPages, aboutPages, contactPages } = result.data
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

  cardPages.nodes.forEach((page) => {
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

  aboutPages.nodes.forEach((page) => {
    const { slug } = page
    createPage({
      path: `/${slug}`,
      component: AboutPageTemplate,
      context: {
        slug: slug,
      },
    })
  })

  contactPages.nodes.forEach((page) => {
    const { slug } = page
    const thankYouPagePath = `/${slug}/thank-you`
    createPage({
      path: `/${slug}`,
      component: ContactPageTemplate,
      context: {
        slug: slug,
        thankYouPagePath: thankYouPagePath,
      },
    })
    createPage({
      path: thankYouPagePath,
      component: ThankYouPageTemplate,
      context: {
        slug: slug,
      },
    })
  })
}
