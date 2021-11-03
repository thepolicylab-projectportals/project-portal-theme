import { resolve } from "path"

const { AIRTABLE_TABLE_NAME: tableName } = process.env

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
      allAirtable(filter: { table: { eq: "${tableName}" } }) {
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
      path: `/${slug}`,
      component: resolve(__dirname, "../templates/single-item.tsx"),
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
    },
  })
}
