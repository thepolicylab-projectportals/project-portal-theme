import React from "react"
import { graphql } from "gatsby"
import { ProjectPage, ProjectPageProps } from "../components"

export default ({ data }: ProjectPageProps) =>
  ProjectPage({
    data,
    title: "Completed projects",
    pageName: "Completed projects",
    lede: "We are committed to using and sharing evidence. Below are all the projects completed to date, along with findings and links to additional resources, as applicable.",
  })

export const query = graphql`
  query CompletedQuery($tableName: String!) {
    items: allAirtable(
      filter: {
        table: { eq: $tableName }
        data: { status: { eq: "completed" } }
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
