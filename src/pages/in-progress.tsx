import React from "react"
import { graphql } from "gatsby"
import { ProjectPage, ProjectPageProps } from "../components"

export default ({ data }: ProjectPageProps) =>
  ProjectPage({
    data,
    title: "In-progress projects",
    pageName: "In-progress projects",
    lede: "Agencies are working with partners to answer important questions to improve the lives of residents. All these projects are ongoing, so check back soon for results.",
  })

export const query = graphql`
  query InProgressQuery($tableName: String!) {
    items: allAirtable(
      filter: {
        table: { eq: $tableName }
        data: { status: { eq: "in-progress" } }
      }
    ) {
      nodes {
        data {
          question
          partnerName
          slug
          status
          summary
          deliverable
          expertise
          keyDates
          opportunityCloses
          commitment
          contactName
          contactTitle
          contactEmail
          applicationProcess
          statusOfData
          priorResearch
          fundingInfo
          collaborationType
        }
      }
    }
    bgImage: file(relativePath: { regex: "/in-progress.jpg/" }) {
      childImageSharp {
        resize(width: 1536) {
          src
        }
      }
    }
  }
`
