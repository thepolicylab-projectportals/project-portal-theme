import { graphql } from "gatsby"
import { AboutPageLayout } from "../layouts"

export default AboutPageLayout

export const query = graphql`
  query AboutQuery($slug: String!) {
    projectPortalConfig {
      ...LayoutQuery
    }
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
