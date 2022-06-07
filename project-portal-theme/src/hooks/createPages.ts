import { resolve } from "path"

const tableName = require("../consts").AIRTABLE_TABLE_PROJECTS

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
},
themeOptions: any
) => void

export const createPages: GatsbyCreatePages = async ({ graphql, actions }, themeOptions) => {
  const { createPage } = actions
  const allAirtable = await graphql(`
    {
      allAirtable(
        filter: {
          table: { eq: "${tableName}" }
          data: { partnerName: { eq: "${themeOptions.airtablePartnerName}" } }
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

export const onCreatePage = ({ page, actions }, themeOptions) => {
  const { createPage } = actions

  createPage({
    ...page,
    context: {
      ...page.context,
      tableName,
      partnerName: themeOptions.airtablePartnerName,
    },
  })
}
