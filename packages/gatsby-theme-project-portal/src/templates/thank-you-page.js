import { graphql } from "gatsby"
import { ThankYouPageLayout } from "../layouts"

export default ThankYouPageLayout

export const query = graphql`
  query ThankYouQuery($slug: String!) {
    generalPage(slug: { eq: $slug }) {
      image {
        childImageSharp {
          resize(width: 1536) {
            src
          }
        }
      }
    }
  }
`
