import React from "react"
import { graphql } from "gatsby"
import { ProjectPage, ProjectPageProps } from "../components"

export default ({ data }: ProjectPageProps) =>
  ProjectPage({
    data,
    title: "Open opportunities",
    lede: "San Antonio is building research partnerships to help answer questions about how to best serve residents. We are seeking partners with methodological expertise related to design, data analytics, and field experimentation, as well as domain knowledge related to the topics. Browse open opportunities below, and we look forward to hearing from you!",
    pageName: "Open opportunities",
  })

export const query = graphql`
  query IndexQuery($tableName: String!) {
    items: allAirtable(
      filter: { table: { eq: $tableName }, data: { status: { eq: "open" } } }
    ) {
      nodes {
        data {
          question
          partnerName
          slug
          summary
          status
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
