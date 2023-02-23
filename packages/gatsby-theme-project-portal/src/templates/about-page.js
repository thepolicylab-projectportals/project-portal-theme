import { graphql } from "gatsby"
import { AboutPageLayout } from "../layouts"

export default AboutPageLayout

export const query = graphql`
  query AboutQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    generalPage(slug: { eq: $slug }) {
      pageName
      title
      header
      aims {
        title
        text
      }
      faq {
        title
        text
      }
      accessibility
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
