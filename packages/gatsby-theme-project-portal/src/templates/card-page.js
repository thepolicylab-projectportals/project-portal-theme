import { graphql } from "gatsby"
import { CardPageLayout } from "../layouts"

export default CardPageLayout
export { Head } from "../hooks"

export const query = graphql`
  query CardPageQuery($slug: String!, $statusFilter: [String]) {
    ...HeadData
    page: cardPage(slug: { eq: $slug }) {
      title
      description: lede
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
