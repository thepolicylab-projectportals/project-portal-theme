import { graphql } from "gatsby"
import { ThankYouPageLayout } from "../layouts"

export default ThankYouPageLayout

export const query = graphql`
  query ThankYouQuery($slug: String!) {
    bgImage: file(
      name: { eq: $slug }
      extension: { in: ["png", "jpg", "jpeg"] }
      sourceInstanceName: { eq: "themeImages" }
    ) {
      childImageSharp {
        resize(width: 1536, height: 352) {
          src
        }
      }
    }
  }
`
