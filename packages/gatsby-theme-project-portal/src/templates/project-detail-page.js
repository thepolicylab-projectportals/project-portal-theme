import { graphql } from "gatsby"
import { ProjectDetailPage } from "../layouts"

export default ProjectDetailPage

export const query = graphql`
  query ProjectDetailPageQuery($slug: String!) {
    project(slug: { eq: $slug }) {
      question
      summary
      status
      opportunityCloses
      startDate
      endDate
      lastModified
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
    }
  }
`
