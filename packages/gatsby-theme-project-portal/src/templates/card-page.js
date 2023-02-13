import { graphql } from "gatsby"
import { CardPageLayout } from "../layouts"
import { CARD_PAGE_NODE_TYPE } from "../../utils/types"

export default CardPageLayout

export const query = graphql`
  query CardPageQuery($slug: String!, $statusFilter: [String]) {
    ${CARD_PAGE_NODE_TYPE}(slug: { eq: $slug }) {
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
