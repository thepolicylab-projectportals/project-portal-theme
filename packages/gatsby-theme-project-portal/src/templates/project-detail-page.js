import { graphql } from "gatsby"
import { ProjectDetailPage } from "../layouts"

export default ProjectDetailPage
export { Head } from "../hooks"

export const query = graphql`
  query ProjectDetailPageQuery($slug: String!) {
    ...HeadData
    ...LayoutData
    page: project(slug: { eq: $slug }) {
      title: question
      description: summary
    }
    defaultContactImage: file(
      name: { eq: "default-contact" }
      extension: { in: ["png", "jpg", "jpeg"] }
      # only match files in the "themeImages" sourced directory:
      sourceInstanceName: { eq: "themeImages" }
    ) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          height: 100
          placeholder: BLURRED
          layout: FIXED
        )
      }
    }
    projectPortalConfig {
      projectInterestLink
      staticText {
        mainContact {
          ongoingText
          completeText
        }
      }
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
      openText: emailContent
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
