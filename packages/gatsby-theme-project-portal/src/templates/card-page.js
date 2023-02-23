import { graphql } from "gatsby"
import { CardPageLayout } from "../layouts"

export default CardPageLayout

export const query = graphql`
  query CardPageQuery($slug: String!, $statusFilter: [String]) {
    cardPage(slug: { eq: $slug }) {
      pageName
      title
      lede
      sortOptions
    }
    allProject(filter: { status: { in: $statusFilter } }) {
      nodes {
        ...CardDetails
      }
    }
    allTopic {
      nodes {
        ...TopicDetails
      }
    }
    bgImage: file(
      name: { eq: $slug }
      extension: { in: ["png", "jpg", "jpeg"] }
      sourceInstanceName: { eq: "themeImages" }
    ) {
      childImageSharp {
        resize(width: 1536) {
          src
        }
      }
    }
  }
`
