import React from "react"
import { graphql } from "gatsby"
import { ProjectPage, ProjectPageProps } from "../components"

export default ({ data }: ProjectPageProps) =>
  ProjectPage({
    data,
    title: "Ongoing projects",
    pageName: "Ongoing projects",
    lede: "Learn about the ongoing research collaborations in San Antonio. Check back soon for results!",
  })

export const query = graphql`
  query OngoingQuery($tableName: String!) {
    items: allAirtable(
      filter: { table: { eq: $tableName }, data: { status: { eq: "ongoing" } } }
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
