import React from "react"
import { graphql } from "gatsby"
import { ProjectPage, ProjectPageProps } from "../components"
import { open } from "language.json"

export default ({ data }: ProjectPageProps) =>
  ProjectPage({
    data,
    ...open,
  })

export const query = graphql`
  query IndexQuery($tableName: String!) {
    items: allAirtable(
      filter: { table: { eq: $tableName }, data: { status: { eq: "open" } } }
      sort: { fields: [data___opportunityCloses], order: ASC }
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
          policyAreas
          supportNeeded
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
        }
      }
    }
    bgImage: file(relativePath: { regex: "/open.jpg/" }) {
      childImageSharp {
        resize(width: 1536) {
          src
        }
      }
    }
  }
`
