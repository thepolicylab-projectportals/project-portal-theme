import { graphql } from "gatsby"
import { ContactPageLayout } from "../layouts"

export default ContactPageLayout
export { Head } from "../hooks"

export const query = graphql`
  query ContactQuery($slug: String!) {
    ...HeadData
    ...LayoutData
    page: generalPage(slug: { eq: $slug }) {
      title
      description: lede
    }
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
