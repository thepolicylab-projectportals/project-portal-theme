import React from "react"
import { graphql } from "gatsby"
import { CardProps } from "../components"
import { useStaticText } from "../hooks"
import { ProjectPageLayout } from "../layouts/ProjectPageLayout"

export interface CompletedProjectProps {
  data: {
    allProject: {
      nodes: CardProps[]
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

export default ({ data: { allProject, bgImage } }: CompletedProjectProps) => {
  const { completed } = useStaticText()

  return (
    <ProjectPageLayout
      allProject={allProject}
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
        endDate
        created
        question
        slug
        status
        summary
        deliverable
        expertise
        keyDates
        agency
        topics
        statusOfData
        priorResearch
        fundingInfo
        lastModified
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
