import { graphql } from "gatsby"
import { ThankYouPageLayout } from "../layouts"

export default ThankYouPageLayout
export { Head } from "../hooks"

export const query = graphql`
  query ThankYouQuery($slug: String!) {
    ...HeadData
    ...LayoutData
    page: generalPage(slug: { eq: $slug }) {
      title
      description: lede
    }
    generalPage(slug: { eq: $slug }) {
      image {
        ...HeaderWithImageBackground
      }
    }
  }
`
