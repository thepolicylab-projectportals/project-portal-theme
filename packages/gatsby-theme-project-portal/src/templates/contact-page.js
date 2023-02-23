import { graphql } from "gatsby"
import { ContactPageLayout } from "../layouts"

export default ContactPageLayout

export const query = graphql`
  query ContactQuery($slug: String!) {
    generalPage(slug: { eq: $slug }) {
      title
      lede
    }
    projectPortalConfig {
      recaptchaSiteKey
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
