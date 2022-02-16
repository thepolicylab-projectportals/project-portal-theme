import React from "react"
import { graphql } from "gatsby"
import { ProjectPage, ProjectPageProps } from "../components"
import { ongoing } from "site/language.json"

export default ({ data }: ProjectPageProps) =>
  ProjectPage({
    data,
    ...ongoing,
  })

export const query = graphql`
  query OngoingQuery($tableName: String!, $partnerName: String!) {
    items: allAirtable(
      filter: {
        table: { eq: $tableName }
        data: { status: { eq: "ongoing" }, partnerName: { eq: $partnerName } }
      }
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
        }
      }
    }
    bgImage: file(relativePath: { regex: "/^ongoing.jpg$" }) {
      childImageSharp {
        resize(width: 1536) {
          src
        }
      }
    }
  }
`
