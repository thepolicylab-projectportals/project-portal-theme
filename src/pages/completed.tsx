import React from "react"
import { graphql } from "gatsby"
import { ProjectPage, ProjectPageProps } from "../components"
import { completed } from "language.json"

export default ({ data }: ProjectPageProps) =>
  ProjectPage({
    data,
    ...completed,
  })

export const query = graphql`
  query CompletedQuery($tableName: String!) {
    items: allAirtable(
      filter: {
        table: { eq: $tableName }
        data: { status: { eq: "completed" } }
      }
      sort: { fields: [data___endDate], order: DESC }
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
    bgImage: file(relativePath: { regex: "/completed.jpg/" }) {
      childImageSharp {
        resize(width: 1536) {
          src
        }
      }
    }
  }
`
