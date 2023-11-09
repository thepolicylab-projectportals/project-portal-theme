const { withDefaults } = require(`./utils/default-options`)
const fs = require("fs")
const lodash = require("lodash")
const lunr = require("lunr")
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
      allGeneralPage {
        nodes {
          slug
          lede
          faq {
            text
            title
          }
          aims {
            text
            title
          }
          title
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

exports.onPostBuild = async ({ reporter, basePath, pathPrefix, graphql }) => {
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
      allGeneralPage {
        nodes {
          slug
          lede
          faq {
            text
            title
          }
          aims {
            text
            title
          }
          title
        }
      }
    }
  `)
  const { allProject, allGeneralPage } = result.data
  const createSearchIndex = (searchNodes) => {
    // searchNodes = {allProject[], allGeneralPage[], siteUrl}
    let documents = []
    Object.keys(searchNodes).forEach((page) => {
      if (page === "siteUrl") {
        return
      } else {
        searchNodes[page].nodes.forEach((node) => {
          let tempNode = structuredClone(node)
          if (page === "allProject") {
            if (!node.slug.includes("/")) {
              tempNode.slug = `project/${node.slug}`
            }
          }
          const newItem = Object.values(tempNode).map((field) => {
            if (lodash.isNull(field)) {
              return null
            }

            if (typeof field === "object") {
              return Object.values(field)
                .filter((value) => !lodash.isNull(value))
                .map((value) =>
                  typeof value === "string"
                    ? value
                    : Object.values(value)
                        .filter((k) => !lodash.isNull(k))
                        .join(" ")
                )
                .join(" ")
            } else {
              return field
            }
          })

          Object.keys(tempNode).forEach((page, i) => {
            tempNode[page] = newItem[i]
          })
          documents.push(tempNode)
        })
      }
    })

    let index = lunr(function () {
      this.ref("slug") // identifier
      // fields to search
      this.field("slug")
      this.field("faq")
      this.field("aims")
      this.field("lede")
      this.field("title")
      this.field("question")
      this.field("status")
      this.field("agency")
      this.field("topics")
      this.field("mainContact")
      this.field("summary")
      this.field("status")
      this.field("purpose")
      this.field("emailContent")
      this.field("projectTeam")
      this.field("expertise")
      this.field("requirement")

      // allow access to the position of the found word in the field
      this.metadataWhitelist = ["position"]
      /* allow stop words (see https://github.com/olivernn/lunr.js/blob/master/lunr.js)
             we have 'about' as one of the slugs, which spurred this decision
             We can implement our own stopWordFilter:
                      var idx = lunr(function () {
                        // normal index definition
                        this.pipeline.after(lunr.stopWordFilter, myStopWordFilter)
                         this.pipeline.remove(lunr.stopWordFilter)
                      })
          */
      this.pipeline.remove(lunr.stopWordFilter)

      documents.forEach(function (doc) {
        this.add(doc)
      }, this)
    })
    return { index, documents }
  }

  const { index, documents } = createSearchIndex({ allProject, allGeneralPage })
  fs.writeFile("static/lunr-index.json", JSON.stringify(index), (err) => {
    if (err) console.error(err)
  })
  fs.writeFile("static/documents.json", JSON.stringify(documents), (err) => {
    if (err) console.error(err)
  })

  reporter.info(
    `Site was built with basePath: ${basePath} & pathPrefix: ${pathPrefix}`
  )
}
