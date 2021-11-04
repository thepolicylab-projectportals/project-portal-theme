import React from "react"
import { graphql } from "gatsby"
import { ProjectPage, ProjectPageProps } from "../components"

export default ({ data }: ProjectPageProps) =>
  ProjectPage({
    data,
    title: "Open research questions",
    lede: "We are assembling an interdisciplinary network of partners, who collectively can provide methodological expertise related to design, data analytics, and field experimentation, as well as domain knowledge related to the topics. There are opportunities for every-level to highly-experienced scientists.",
    footerTitle: "Help us shape the future of the partnerships portal!",
    footerText:
      "This portal is part of a pilot on new ways to connect academics with research opportunities in government. If you are interested in contributing to the project, we’d like to get in touch.",
    footerButton: "Share your feedback",
    footerLink: "/feedback",
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
    bgImage: file(relativePath: { regex: "/bg-index.png/" }) {
      childImageSharp {
        resize(width: 1536, height: 352) {
          src
        }
      }
    }
  }
`
