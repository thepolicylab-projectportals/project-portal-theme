import { graphql } from "gatsby"
import { ContactPageLayout } from "../layouts"

export default ContactPageLayout

export const query = graphql`
  query ContactQuery($slug: String!) {
    generalPage(slug: { eq: $slug }) {
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
    projectPortalConfig {
      recaptchaSiteKey
    }
  }
`
