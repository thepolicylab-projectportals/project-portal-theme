const { withDefaults } = require(`./utils/default-options`)
const {
  projectTypeDefs,
  projectPortalConfigTypeDefs,
  contactTypeDefs,
  pageTypeDefs,
} = require(`./utils/types`)
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

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allProject {
        nodes {
          title
          agency
          topics {
            title
          }
          slug
          summary
          statusOfData
          status
          startDate
          requirement
          question
          purpose
          projectTeam {
            name
            employer
          }
          priorResearch
          opportunityCloses
          mainContact {
            name
          }
          fundingInfo
          expertise
          faq {
            text
            title
          }
          deliverable
          emailContent
          endDate
          slug
        }
      }
      allCardPage {
        nodes {
          slug
          filterOn {
            status
          }
        }
      }
      aboutPages: allGeneralPage(filter: { templateKey: { eq: "AboutPage" } }) {
        nodes {
          slug
        }
      }
      contactPages: allGeneralPage(
        filter: { templateKey: { eq: "ContactPage" } }
      ) {
        nodes {
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(result.errors)
  }

  // Create Posts and Post pages.
  const { allProject } = result.data
  const projects = allProject.nodes

  // Create a page for each Post
  projects.forEach((node) => {
    createPage({
      path: `project/${node.slug}`,
      component: require.resolve(`./src/layouts/ProjectDetailPage.tsx`),
      context: {
        slug: node.slug,
        pagePath: `project/${node.slug}`,
        projectIs: node,
      },
    })
  })

  const { allCardPage } = result.data
  allCardPage.nodes.forEach((page) => {
    const {
      slug,
      filterOn: { status },
    } = page
    createPage({
      path: `/${slug}`,
      component: require.resolve(`./src/layouts/CardPageLayout.tsx`),
      context: {
        slug: slug,
        statusFilter: status,
      },
    })
  })

  const { aboutPages } = result.data
  aboutPages.nodes.forEach((page) => {
    const { slug } = page
    createPage({
      path: `/${slug}`,
      component: require.resolve(`./src/layouts/AboutPageLayout.tsx`),
      context: {
        slug: slug,
      },
    })
  })
  const { contactPages } = result.data
  contactPages.nodes.forEach((page) => {
    const { slug } = page
    const thankYouPagePath = `/${slug}/thank-you`
    createPage({
      path: `/${slug}`,
      component: require.resolve(`./src/layouts/ContactPageLayout.tsx`),
      context: {
        slug: slug,
        thankYouPagePath: thankYouPagePath,
      },
    })
    createPage({
      path: thankYouPagePath,
      component: require.resolve("./src/layouts/ThankYouPageLayout.tsx"),
      context: {
        slug: slug,
      },
    })
  })
}
