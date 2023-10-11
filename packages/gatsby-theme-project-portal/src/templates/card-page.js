import { graphql } from "gatsby"
import { CardPageLayout } from "../layouts"

export default CardPageLayout
export { Head } from "../hooks"

export const query = graphql`
  query CardPageQuery($slug: String!) {
    ...HeadData
    ...LayoutData
    page: cardPage(slug: { eq: $slug }) {
      title
      description: lede
    }
    cardPage(slug: { eq: $slug }) {
      pageName
      title
      lede
      sortOptions
      image {
        ...HeaderWithImageBackground
      }
    }
  }
`
