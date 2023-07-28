import { graphql } from "gatsby"
import { ProjectDetailPage } from "../layouts"

export default ProjectDetailPage

export { Head } from "../hooks"

export const query = graphql`
  query ProjectDetailPageQuery($slug: String!) {
    ...LayoutQuery
    projectPortalConfig {
      staticText {
        main_contact_text {
          ongoingText
          completeText
        }
      }
    }
    page: project(slug: { eq: $slug }) {
      title
      description: summary
    }
    project(slug: { eq: $slug }) {
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
        image {
          childImageSharp {
            gatsbyImageData(
              width: 100
              height: 100
              placeholder: BLURRED
              layout: FIXED
            )
          }
        }
      }
      projectTeam {
        name
        title
        employer
        email
        image {
          childImageSharp {
            gatsbyImageData(
              width: 100
              height: 100
              placeholder: BLURRED
              layout: FIXED
            )
          }
        }
      }
      faq {
        text
        title
      }
    }
  }
`
