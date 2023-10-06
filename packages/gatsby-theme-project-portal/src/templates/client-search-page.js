import { graphql } from "gatsby"
import { SearchPageLayout } from "../layouts"

export default SearchPageLayout

export const query = graphql`
  query SearchQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    generalPage(slug: { eq: $slug }) {
      pageName
      title
      header
      accessibility
      image {
        childImageSharp {
          resize(width: 1536) {
            src
          }
        }
      }
    }
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
    allSitePage {
      nodes {
        pageContext
      }
    }
  }
`
