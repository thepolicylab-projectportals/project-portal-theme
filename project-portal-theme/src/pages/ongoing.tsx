import React from "react"
import { graphql } from "gatsby"
import { ProjectPage, ProjectPageProps } from "../components"
import { useSiteStaticText } from "../hooks/useSiteStaticText"

export default ({ data }: ProjectPageProps) =>
  ProjectPage({
    data,
    ...useSiteStaticText().ongoing,
    dateField: "startDate",
  })

export const query = graphql`
  query OngoingQuery{
    items:  allMarkdownRemark(filter: {frontmatter: {status: {eq: "ongoing"}}}) {
    nodes {
       frontmatter {
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
          commitment
          contactName
          contactTitle
          contactEmail
          applicationProcess
          statusOfData
          priorResearch
          fundingInfo
          collaborationType
          lastModified
        }
      }
    }
  }
`
