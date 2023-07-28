import { graphql } from "gatsby"
import { CardPageLayout } from "../layouts"

export default CardPageLayout

export const query = graphql`
  query CardPageQuery($slug: String!, $statusFilter: [String]) {
    projectPortalConfig {
      ...LayoutQuery
    }
    cardPage(slug: { eq: $slug }) {
      pageName
      title
      lede
      sortOptions
      image {
        childImageSharp {
          resize(width: 1536) {
            src
          }
        }
      }
    }
    allProject(filter: { status: { in: $statusFilter } }) {
      nodes {
        ...CardDetails
      }
    }
  }
`

export { Head } from "../components/NewSiteMetadata"
