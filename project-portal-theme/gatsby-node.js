"use strict"

require("source-map-support").install()

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  // Query for markdown nodes to use in creating pages.
  const allAirtable = await graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { slug: { ne: null } } }) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  if (allAirtable.errors) {
    reporter.panic("error loading projects", allAirtable.errors)
    return
  }

  const projectDetailComponentPath = require.resolve(
    "@thepolicylab-projectportals/project-portal-theme/src/templates/ProjectDetail.tsx"
  )

  allAirtable.data.allMarkdownRemark.nodes.forEach(
    ({ frontmatter: { slug } }) => {
      createPage({
        path: `/project/${slug}`,
        component: projectDetailComponentPath,
        context: { slug },
      })
    }
  )
}

exports.onCreatePage = ({ page, actions }, themeOptions) => {
  const { createPage } = actions

  createPage({
    ...page,
    context: {
      ...page.context,
      tableName: themeOptions.tableName,
      partnerName: themeOptions.PartnerName,
    },
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      question: String
      partnerName: String
      slug: String
      status: String
      agency: String
      topics: [String]
      supportNeeded: [String]
      summary: String
      deliverable: String
      purpose: String
      expertise: String
      requirement: String
      keyDates: String
      statusOfData: String
      priorResearch: String
      fundingInfo: String
      emailContent: String
      email: String
      lastModified: Date @dateformat
      opportunityCloses: Date @dateformat
      startDate: Date @dateformat
      endDate: Date @dateformat
      applicationProcess: String
      collaborationType: [String]
      commitment: String
    }
  `
  createTypes(typeDefs)
}
