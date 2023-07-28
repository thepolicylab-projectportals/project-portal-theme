import { graphql } from "gatsby"
import { ThankYouPageLayout } from "../layouts"

export default ThankYouPageLayout

export const query = graphql`
  query ThankYouQuery($slug: String!) {
    ...LayoutQuery
    page: generalPage(slug: { eq: $slug }) {
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

export { Head } from "../hooks"
