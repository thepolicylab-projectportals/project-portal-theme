import React from "react"
import { graphql } from "gatsby"
import { ProjectPage, ProjectPageProps } from "../components"
import language from "site/language.json"

export default function ongoingPage({ data, pageContext }) {
  const { currentPage, numPages, status } = pageContext
  return ProjectPage({
    currentPage,
    numPages,
    status,
    data,
    ...language.ongoing,
  })
}

export const query = graphql`
  query OngoingQuery(
    $tableName: String!
    $partnerName: String!
    $limit: Int!
    $skip: Int!
  ) {
    items: allAirtable(
      filter: {
        table: { eq: $tableName }
        data: { status: { eq: "ongoing" }, partnerName: { eq: $partnerName } }
      }
      sort: { fields: [data___startDate], order: DESC }
      limit: $limit
      skip: $skip
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
          startDate
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
    bgImage: file(relativePath: { regex: "/^ongoing.jpg$/" }) {
      childImageSharp {
        resize(width: 1536) {
          src
        }
      }
    }
  }
`
