import React from "react"
import { graphql } from "gatsby"
import { CardProps } from "../components"
import { useStaticText } from "../hooks"
import { ProjectPageLayout } from "../layouts/ProjectPageLayout"

export interface OpenProjectProps {
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

export default ({ data: { allProject, bgImage } }: OpenProjectProps) => {
  const { open } = useStaticText()

  return (
    <ProjectPageLayout
      allProject={allProject}
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
        question
        slug
        status
        summary
        deliverable
        expertise
        keyDates
        endDate
        agency
        topics
        statusOfData
        priorResearch
        fundingInfo
        lastModified
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
