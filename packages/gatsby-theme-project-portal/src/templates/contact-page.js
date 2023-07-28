import { graphql } from "gatsby"
import { ContactPageLayout } from "../layouts"

export default ContactPageLayout

export const query = graphql`
  query ContactQuery($slug: String!) {
    projectPortalConfig {
      recaptchaSiteKey
      ...LayoutQuery
    }
    site {
      ...HeadData
    }
    page: generalPage(slug: { eq: $slug }) {
      title
      lede
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

export { Head } from "../components/NewSiteMetadata"
