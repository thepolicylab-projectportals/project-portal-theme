import React from "react"
import { graphql } from "gatsby"
import { CardProps, TopicType } from "../components"
import { useStaticText } from "../hooks"
import { ProjectPageLayout } from "../layouts/ProjectPageLayout"

export interface OngoingProjectProps {
  data: {
    allProject: {
      nodes: CardProps[]
    }
    allTopic: {
      nodes: TopicType[]
    }
    bgImage: {
      childImageSharp: {
        resize: {
          src: string
        }
      }
    }
  }
}

export default ({
  data: { allProject, allTopic, bgImage },
}: OngoingProjectProps) => {
  const { ongoing } = useStaticText()

  return (
    <ProjectPageLayout
      allProject={allProject}
      allTopic={allTopic}
      bgImage={bgImage}
      title={ongoing.title}
      lede={ongoing.lede}
      pageName={ongoing.pageName}
      sortOptions={["startDate", "created"]}
    />
  )
}
export const query = graphql`
  query ProjectPageQuery {
    allProject(filter: { status: { eq: "ongoing" } }) {
      nodes {
        ...CardDetails
      }
    }
    allTopic {
      nodes {
        ...TopicDetails
      }
    }
    bgImage: file(
      name: { eq: "ongoing" }
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
