import { graphql } from "gatsby"
import { AboutPageLayout } from "../layouts"

export default AboutPageLayout
export { Head } from "../hooks"

export const query = graphql`
  query AboutQuery($slug: String!) {
    ...HeadData
    ...LayoutData
    page: generalPage(slug: { eq: $slug }) {
      title
      description: lede
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
        ...HeaderWithImageBackground
      }
    }
  }
`
