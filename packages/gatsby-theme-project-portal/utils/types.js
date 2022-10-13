// constants for Project Portal Config type
const CONFIG_NODE_TYPE = `ProjectPortalConfig`

const projectPortalConfigTypeDefs = `
    type ${CONFIG_NODE_TYPE} implements Node {
      showDevBanner: Boolean
    }
  `

// constants for GraphQL Project type
const PROJECT_NODE_TYPE = `Project`

const projectTypeDefs = `
    type ${PROJECT_NODE_TYPE} implements Node {
      slug: String!
      
      question: String
      partnerName: String
      status: String
      
      opportunityCloses: Date @dateformat
      startDate: Date @dateformat
      endDate: Date @dateformat
  
      agency: String
      topics: [String]
      supportNeeded: [String]
      
      summary: String
      deliverable: String
      purpose: String
      expertise: String
      requirement: String
      keyDates: String
      statusOfData: String
      priorResearch: String
      fundingInfo: String
      emailContent: String
      
      lastModified: Date @dateformat(formatString: "YYYY-MM-DDTHH:mm:ss.SSSZ")
    }
  `

module.exports = {
  CONFIG_NODE_TYPE,
  projectPortalConfigTypeDefs,
  PROJECT_NODE_TYPE,
  projectTypeDefs,
}