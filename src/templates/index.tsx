import React from "react"
import { graphql } from "gatsby"
import { ProjectPage, ProjectPageProps } from "../components"
import language from "site/language.json"

export default function openPage({ data, pageContext }) {
  const { currentPage, numPages, status } = pageContext
  return ProjectPage({
    currentPage,
    numPages,
    data,
    status,
    ...language.open,
  })
}

export const query = graphql`
  query IndexQuery(
    $tableName: String!
    $partnerName: String!
    $limit: Int!
    $skip: Int!
  ) {
    items: allAirtable(
      filter: {
        table: { eq: $tableName }
        data: { status: { eq: "open" }, partnerName: { eq: $partnerName } }
      }
      sort: { fields: [data___opportunityCloses], order: ASC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        data {
          question
          partnerName
          slug
          summary
          status
          opportunityCloses
          startDate
          endDate
          agency
          topics
          deliverable
          purpose
          expertise
          requirement
          keyDates
          priorResearch
          statusOfData
          fundingInfo
          commitment
          contactName
          contactTitle
          contactEmail
          lastModified
        }
      }
    }
    bgImage: file(relativePath: { regex: "/^open.jpg$/" }) {
      childImageSharp {
        resize(width: 1536) {
          src
        }
      }
    }
  }
`
