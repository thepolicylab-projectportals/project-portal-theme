import React from "react"
import { graphql } from "gatsby"
import { ProjectPage, ProjectPageProps } from "../components"
import language from "../../language.json"

export default ({ data }: ProjectPageProps) =>
  ProjectPage({
    data,
    ...language.ongoing,
  })

export const query = graphql`
  query OngoingQuery($tableName: String!) {
    items: allAirtable(
      filter: { table: { eq: $tableName }, data: { status: { eq: "ongoing" } } }
      sort: { fields: [data___startDate], order: DESC }
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
    bgImage: file(relativePath: { regex: "/ongoing.jpg/" }) {
      childImageSharp {
        resize(width: 1536) {
          src
        }
      }
    }
  }
`
