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
