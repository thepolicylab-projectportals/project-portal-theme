import React from "react"
import { graphql } from "gatsby"
import { ProjectPage, ProjectPageProps } from "../components"
import language from "site/language.json"

export default ({ data }: ProjectPageProps) =>
  ProjectPage({
    data,
    ...language.open,
    sortOptions: ["created", "opportunityCloses"],
  })

export const query = graphql`
  query IndexQuery($tableName: String!, $partnerName: String!) {
    items: allAirtable(
      filter: {
        table: { eq: $tableName }
        data: { status: { eq: "open" }, partnerName: { eq: $partnerName } }
      }
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
          created
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
