const { withDefaults } = require(`./utils/default-options`)
const fs = require("fs")

const { projectTypeDefs, contactTypeDefs, pageTypeDefs } = require(
  `./utils/types`
)

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
  createTypes(projectTypeDefs)
  createTypes(contactTypeDefs)
  createTypes(pageTypeDefs)
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allProject {
        nodes {
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
  projects.forEach((project) => {
    const { slug } = project
    createPage({
      path: `project/${slug}`,
      component: require.resolve(`./src/layouts/ProjectDetailPage.tsx`),
      context: {
        slug: slug,
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
