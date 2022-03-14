import { resolve } from "path"

import { AIRTABLE_TABLE_PROJECTS as tableName } from "../consts"
const meta = require(`../../${process.env.PP_CONFIG_BASE}meta.json`)

interface PageInput {
  path: string
  component: string
  layout?: string
  context?: any
}

interface BoundActionCreators {
  createPage: (page: PageInput) => void
  deletePage: (page: PageInput) => void
  createRedirect: (opts: {
    fromPath: string
    isPermanent?: boolean
    redirectInBrowser?: boolean
    toPath: string
  }) => void
}

export type GatsbyCreatePages = (fns: {
  graphql: any
  actions: BoundActionCreators
}) => void

export const createPages: GatsbyCreatePages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const allAirtable = await graphql(`
    {
      allAirtable(
        filter: {
          table: { eq: "${tableName}" }
          data: { partnerName: { eq: "${meta.airtablePartnerName}" } }
        }
      ) {
        nodes {
          data {
            slug
            status
          }
        }
      }
    }
  `)

  allAirtable.data.allAirtable.nodes.forEach(({ data: { slug } }) => {
    createPage({
      path: `/project/${slug}`,
      component: resolve(__dirname, "../templates/ProjectDetail.tsx"),
      context: { slug },
    })
  })

  const openPosts = allAirtable.data.allAirtable.nodes.filter(
    (node) => node.data.status == "open"
  ).length
  const ongoingPosts = allAirtable.data.allAirtable.nodes.filter(
    (node) => node.data.status == "ongoing"
  ).length
  const completedPosts = allAirtable.data.allAirtable.nodes.filter(
    (node) => node.data.status == "completed"
  ).length
  const postsPerPage = 6

  var numPages = Math.ceil(openPosts / postsPerPage)
  var status = "open"
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i == 0 ? `/` : `/open/${i + 1}`,
      component: resolve(__dirname, "../templates/index.tsx"),
      context: {
        tableName,
        partnerName: meta.airtablePartnerName,
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        status,
      },
    })
  })

  var numPages = Math.ceil(completedPosts / postsPerPage)
  var status = "completed"
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i == 0 ? `/completed` : `/completed/${i + 1}`,
      component: resolve(__dirname, "../templates/completed.tsx"),
      context: {
        tableName,
        partnerName: meta.airtablePartnerName,
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        status,
      },
    })
  })

  var numPages = Math.ceil(ongoingPosts / postsPerPage)
  var status = "ongoing"
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i == 0 ? `/ongoing` : `/ongoing/${i + 1}`,
      component: resolve(__dirname, "../templates/ongoing.tsx"),
      context: {
        tableName,
        partnerName: meta.airtablePartnerName,
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        status,
      },
    })
  })
}

export const onCreatePage = ({ page, actions }) => {
  const { createPage } = actions

  createPage({
    ...page,
    context: {
      ...page.context,
      tableName,
      partnerName: meta.airtablePartnerName,
    },
  })
}
