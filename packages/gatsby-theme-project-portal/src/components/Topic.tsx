import { graphql } from "gatsby"

export interface TopicType {
  slug: string
  title: string
}

export const query = graphql`
  fragment TopicDetails on Topic {
    slug
    title
  }
`
