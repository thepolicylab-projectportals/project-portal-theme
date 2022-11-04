import React from "react"
import { graphql } from "gatsby"
import { CardProps, TopicType } from "../components"
import { useStaticText } from "../hooks"
import { ProjectPageLayout } from "../layouts/ProjectPageLayout"

export interface OpenProjectProps {
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
}: OpenProjectProps) => {
  const { open } = useStaticText()

  return (
    <ProjectPageLayout
      allProject={allProject}
      allTopic={allTopic}
      bgImage={bgImage}
      title={open.title}
      lede={open.lede}
      pageName={open.pageName}
      sortOptions={["created", "opportunityCloses"]}
    />
  )
}
export const query = graphql`
  query ProjectPageQuery {
    allProject(filter: { status: { eq: "open" } }) {
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
      name: { eq: "open" }
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
