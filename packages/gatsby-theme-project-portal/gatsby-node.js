const { withDefaults } = require(`./utils/default-options`)
const fs = require("fs")
const { createSearchIndex, searchQuery } = require(`./utils/search`)
const {
  siteMetadataTypeDefs,
  projectTypeDefs,
  contactTypeDefs,
  pageTypeDefs,
} = require(`./utils/types`)

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
  createTypes(siteMetadataTypeDefs)
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
      searchPages: allGeneralPage(
        filter: { templateKey: { eq: "SearchPage" } }
      ) {
        nodes {
          slug
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

  const { searchPages } = result.data
  searchPages.nodes.forEach((page) => {
    const { slug } = page
    createPage({
      path: `/${slug}`,
      component: require.resolve(`./src/layouts/SearchPageLayout.tsx`),
      context: {
        slug: slug,
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

exports.onPreBuild = async ({ reporter, basePath, pathPrefix, graphql }) => {
  const result = await graphql(searchQuery)
  const { allProject, allGeneralPage } = result.data

  const [index, documents] = createSearchIndex({ allProject, allGeneralPage })
  await fs.writeFile("static/lunr-index.json", JSON.stringify(index), (err) => {
    if (err) console.error(err)
  })
  await fs.writeFile(
    "static/documents.json",
    JSON.stringify(documents),
    (err) => {
      if (err) console.error(err)
    }
  )
  // this is a function which grabs the page from the original documents
  // lunr tosses this info for SPEED
  const reduceDocuments = documents.reduce(function (page, document) {
    page[document.slug] = document
    return page
  }, {})

  await fs.writeFile(
    "static/documents-reduced.json",
    JSON.stringify(reduceDocuments),
    (err) => {
      if (err) console.error(err)
    }
  )

  reporter.info(
    `Site was built with basePath: ${basePath} & pathPrefix: ${pathPrefix}`
  )
}
