import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
export default function buildDynamicIndex() {
  // this query is duplicated in packages/gatsby-theme-project-portal/utils/search.js
  const { allProject, allGeneralPage } = useStaticQuery(graphql`
    query {
      allProject {
        nodes {
          title
          agency
          topics {
            title
          }
          slug
          summary
          statusOfData
          status
          startDate
          requirement
          question
          purpose
          projectTeam {
            name
            employer
          }
          priorResearch
          opportunityCloses
          mainContact {
            name
          }
          fundingInfo
          expertise
          faq {
            text
            title
          }
          deliverable
          emailContent
          endDate
          slug
        }
      }
      allGeneralPage {
        nodes {
          slug
          lede
          faq {
            text
            title
          }
          aims {
            text
            title
          }
          title
        }
      }
    }
  `)
  return { allProject, allGeneralPage }
}
