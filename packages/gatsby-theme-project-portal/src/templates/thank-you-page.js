import { graphql } from "gatsby"
import { ThankYouPageLayout } from "../layouts"

export default ThankYouPageLayout

export const query = graphql`
  query ThankYouQuery($slug: String!) {
    projectPortalConfig {
      ...LayoutQuery
    }
    site {
      ...HeadData
    }
    ...NavbarIcon
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
