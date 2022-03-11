import React from "react"
import { graphql } from "gatsby"
import { ProjectPage, ProjectPageProps } from "../components"
import language from "site/language.json"

export default function completedPage({ data, pageContext }) {
  const { currentPage, numPages } = pageContext
  return ProjectPage({
    currentPage,
    numPages,
    data,
    ...language.completed,
  })
}
export const query = graphql`
  query CompletedQuery(
    $tableName: String!
    $partnerName: String!
    $limit: Int!
    $skip: Int!
  ) {
    items: allAirtable(
      filter: {
        table: { eq: $tableName }
        data: { status: { eq: "completed" }, partnerName: { eq: $partnerName } }
      }
      sort: { fields: [data___endDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        data {
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
    allImageSharp {
      edges {
        node {
          ... on ImageSharp {
            resize(width: 125, height: 125, rotate: 180) {
              src
            }
          }
        }
      }
    }
    bgImage: file(relativePath: { regex: "/^completed.jpg$/" }) {
      childImageSharp {
        resize(width: 1536) {
          src
        }
      }
    }
  }
`
