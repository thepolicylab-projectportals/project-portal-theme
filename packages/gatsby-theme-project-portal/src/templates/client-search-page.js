import { graphql } from "gatsby"
import { SearchPageLayout } from "../layouts"

export default SearchPageLayout

export const query = graphql`
  query SearchQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    generalPage(slug: { eq: $slug }) {
      pageName
      title
      header
      accessibility
      image {
        childImageSharp {
          resize(width: 1536) {
            src
          }
        }
      }
    }
    allProject {
      nodes {
        ...CardDetails
      }
    }
  }
`
