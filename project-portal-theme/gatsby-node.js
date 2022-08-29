"use strict"

require("source-map-support").install()

//const createPagesModule = require("./src/hooks/createPages")

//exports.createPages = createPagesModule.createPages
const tableName = "Project Page Content"
const PartnerName = "Example Content"

const path = require("path")
// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  // Query for markdown nodes to use in creating pages.
  const allAirtable = await graphql(`
    {
          allMarkdownRemark {
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

  allAirtable.data.allMarkdownRemark.nodes.forEach(({ frontmatter: { slug } }) => {
    createPage({
      path: `/project/${slug}`,
      component: projectDetailComponentPath,
      context: { slug },
    })
  })
}

exports.onCreatePage = ({ page, actions }, themeOptions) => {
  const { createPage } = actions

  createPage({
    ...page,
    context: {
      ...page.context,
      tableName,
      partnerName: PartnerName,
    },
  })
}

console.log()


//exports.onCreatePage = createPagesModule.onCreatePage
