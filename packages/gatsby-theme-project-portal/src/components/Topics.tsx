import { graphql } from "gatsby"
import React, { FunctionComponent } from "react"
import { Feature } from "./Feature"

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
interface TopicsProps {
  topics: TopicType[]
}

export const Topics: FunctionComponent<TopicsProps> = ({ topics }) => {
  return (
    <Feature
      label="Topics"
      className="bg-topics"
      value={topics.map((topic) => topic.title)}
    />
  )
}
