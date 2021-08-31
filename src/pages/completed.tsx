import React from "react"
import { graphql } from "gatsby"
import { ProjectPage, ProjectPageProps } from "../components"

export default ({ data }: ProjectPageProps) =>
  ProjectPage({
    data,
    title: "Completed projects",
    lede:
      "We are committed to using and sharing evidence. Below are all the projects completed to date, along with findings and links to additional resources, as applicable.",
    footerTitle:
      "Interested to use evidence to improve the lives of residents? Check out open partnership opportunities.",
    footerButton: "View open opportunities",
    footerLink: "/open",
  })

export const query = graphql`
  query CompletedQuery($tableName: String!) {
    items: allAirtable(
      filter: {
        table: { eq: $tableName }
        data: { status: { eq: "complete" } }
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
