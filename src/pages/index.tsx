import React from "react"
import { graphql } from "gatsby"
import { ProjectPage, ProjectPageProps } from "../components"

export default ({ data }: ProjectPageProps) =>
  ProjectPage({
    data,
    title: "Open research questions",
    lede:
      "We are assembling an interdisciplinary network of partners, who collectively can provide methodological expertise related to design, data analytics, and field experimentation, as well as domain knowledge related to the topics. There are opportunities for every-level to highly-experienced scientists.",
    footerTitle: "Curious to learn more? See findings from completed projects.",
    footerButton: "View completed projects",
    footerLink: "/completed",
  })

export const query = graphql`
  query IndexQuery($tableName: String!) {
    items: allAirtable(
      filter: { table: { eq: $tableName }, data: { status: { eq: "open" } } }
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
