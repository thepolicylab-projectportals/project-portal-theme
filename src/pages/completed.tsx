import React from "react"
import { graphql } from "gatsby"
import { ProjectPage, ProjectPageProps } from "../components"
import languageJson from "../../language.json"

export default ({ data }: ProjectPageProps) =>
  ProjectPage({
    data,
    title: languageJson.completed[0].title,
    pageName: languageJson.completed[0].pageName,
    lede: languageJson.completed[0].lede,
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
