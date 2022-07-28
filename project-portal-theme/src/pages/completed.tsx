import React from "react"
import { graphql } from "gatsby"
import { ProjectPage, ProjectPageProps } from "../components"
import { useSiteStaticText } from "../hooks/useSiteStaticText"

export default ({ data }: ProjectPageProps) =>
  ProjectPage({
    data,
    ...useSiteStaticText().completed,
    dateField: "endDate",
  })

export const query = graphql`
  query CompletedQuery{
    items:  allMarkdownRemark(filter: {frontmatter: {status: {eq: "completed"}}}) {
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
