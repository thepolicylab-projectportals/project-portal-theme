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

export type GatsbyCreatePages = (
  fns: {
    graphql: any
    actions: BoundActionCreators
  },
  themeOptions: any
) => void

export const createPages: GatsbyCreatePages = async (
  { graphql, actions },
  themeOptions
) => {
  const { createPage } = actions
  const allProjects = await graphql(`
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

  const projectDetailComponentPath = require.resolve(
    "@thepolicylab-projectportals/project-portal-theme/src/templates/ProjectDetail.tsx"
  )
  console.log(allProjects)
  allProjects.data.allMarkdownRemark.nodes.forEach(
    ({ frontmatter: { slug } }) => {
      createPage({
        path: `/project/${slug}`,
        component: projectDetailComponentPath,
        context: { slug },
      })
    }
  )
}

export const onCreatePage = ({ page, actions }, themeOptions) => {
  const { createPage } = actions

  createPage({
    ...page,
    context: {
      ...page.context,
    },
  })
}
console.log()
