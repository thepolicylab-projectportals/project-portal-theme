import React from "react"
import { graphql } from "gatsby"
import { ProjectPage, ProjectPageProps } from "../components"

export default ({ data }: ProjectPageProps) =>
  ProjectPage({
    data,
    title: "In-progress projects",
    lede:
      "Agencies are working with partners to answer important questions to improve the lives of residents. All these projects are ongoing, so check back soon for results.",
    footerTitle: "Curious to learn more? See findings from completed projects.",
    footerButton: "View completed projects",
    footerLink: "/completed",
  })

export const query = graphql`
  query InProgressQuery($tableName: String!) {
    items: allAirtable(
      filter: {
        table: { eq: $tableName }
        data: { status: { eq: "inProgress" } }
      }
    ) {
      nodes {
        data {
          question
          slug
          status
          summary
          deliverable
          expertise
          timeline
          commitment
          contact
          collaborationType
        }
      }
    }
  }
`
