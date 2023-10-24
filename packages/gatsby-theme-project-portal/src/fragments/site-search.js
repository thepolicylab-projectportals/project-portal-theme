import { graphql } from "gatsby"

export const searchFragment = graphql`
  fragment SearchData on Query {
    allProject {
      nodes {
        slug
        question
        title
        summary
        status
        opportunityCloses
        startDate
        endDate
        lastModified
        agency
        topics {
          ...TopicDetails
        }
        deliverable
        purpose
        expertise
        requirement
        keyDates
        priorResearch
        statusOfData
        fundingInfo
        emailContent
        mainContact {
          name
          title
          employer
          email
        }
        projectTeam {
          name
          title
          employer
          email
        }
        faq {
          text
          title
        }
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
`
