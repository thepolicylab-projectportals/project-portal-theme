import React from "react"
import { graphql } from "gatsby"
import { ProjectPage, ProjectPageProps } from "../components"

export default ({ data }: ProjectPageProps) =>
  ProjectPage({
    data,
    title: "Completed projects",
    lede: "We are committed to using and sharing evidence. Below are all the projects completed to date, along with findings and links to additional resources, as applicable.",
    footerTitle:
      "Interested to use evidence to improve the lives of residents? Check out open partnership opportunities.",
    footerText:
      "This portal is part of a pilot on new ways to connect academics with research opportunities in government. If you are interested in contributing to the project, we’d like to get in touch.",
    footerButton: "View open opportunities",
    footerLink: "/open",
  })

export const query = graphql`
  query CompletedQuery($tableName: String!) {
    items: allAirtable(
      filter: {
        table: { eq: $tableName }
        data: { status: { eq: "complete" } }
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
    bgImage: file(relativePath: { regex: "/bg-completed.png/" }) {
      childImageSharp {
        resize(width: 1536, height: 352) {
          src
        }
      }
    }
  }
`
