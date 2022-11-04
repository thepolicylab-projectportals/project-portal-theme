import React from "react"
import { graphql } from "gatsby"
import { CardProps, TopicType } from "../components"
import { useStaticText } from "../hooks"
import { ProjectPageLayout } from "../layouts/ProjectPageLayout"

export interface CompletedProjectProps {
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
}: CompletedProjectProps) => {
  const { completed } = useStaticText()

  return (
    <ProjectPageLayout
      allProject={allProject}
      allTopic={allTopic}
      bgImage={bgImage}
      title={completed.title}
      lede={completed.lede}
      pageName={completed.pageName}
      sortOptions={["endDate", "created"]}
    />
  )
}
export const query = graphql`
  query ProjectPageQuery {
    allProject(filter: { status: { eq: "completed" } }) {
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
      name: { eq: "completed" }
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
