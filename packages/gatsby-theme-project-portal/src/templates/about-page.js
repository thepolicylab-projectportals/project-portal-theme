import { graphql } from "gatsby"
import { AboutPageLayout } from "../layouts"

export default AboutPageLayout

export const query = graphql`
  fragment NavbarIcon on Query {
    navbarLogo: file(
      name: { eq: "navbar" }
      extension: { in: ["png", "jpg", "jpeg"] }
      sourceInstanceName: { eq: "themeImages" }
    ) {
      childImageSharp {
        gatsbyImageData(height: 64)
      }
    }
  }

  query AboutQuery($slug: String!) {
    projectPortalConfig {
      ...LayoutQuery
    }
    site {
      ...HeadData
    }
    ...NavbarIcon
    page: generalPage(slug: { eq: $slug }) {
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
