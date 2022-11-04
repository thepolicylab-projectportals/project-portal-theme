// constants for Project Portal Config type
const CONFIG_NODE_TYPE = `ProjectPortalConfig`

const projectPortalConfigTypeDefs = `
    type ${CONFIG_NODE_TYPE} implements Node {
      siteTitle: String
      showDevBanner: Boolean
      projectInterestLink: String
      pages: [NavbarItemType]
      recaptchaSiteKey: String
    }
    type NavbarItemType {
      name: String
      link: String
      show: Boolean
    }
  `

// constants for GraphQL Project and Contact types
const PROJECT_NODE_TYPE = `Project`
const CONTACT_NODE_TYPE = `Contact`
const TOPIC_NODE_TYPE = `Topic`

const projectTypeDefs = `
    interface ${PROJECT_NODE_TYPE} implements Node {
      id: ID!
      
      slug: String!
      
      question: String
      status: String
      
      opportunityCloses: Date @dateformat
      startDate: Date @dateformat
      endDate: Date @dateformat
  
      agency: String
      topics: [${TOPIC_NODE_TYPE}]
      
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
      created: Date @dateformat(formatString: "YYYY-MM-DDTHH:mm:ss.SSSZ")
      
      mainContact: ${CONTACT_NODE_TYPE}
      projectTeam: [${CONTACT_NODE_TYPE}]
    }
    
    interface ${TOPIC_NODE_TYPE} implements Node {
      id: ID!
      slug: String!
      title: String
    }
  `

const contactTypeDefs = `
  interface ${CONTACT_NODE_TYPE} implements Node {
    id: ID!
  
    slug: String!
    
    name: String
    employer: String
    title: String
    email: String
    
    image: File
   
  }
`

module.exports = {
  CONFIG_NODE_TYPE,
  projectPortalConfigTypeDefs,
  PROJECT_NODE_TYPE,
  projectTypeDefs,
  CONTACT_NODE_TYPE,
  contactTypeDefs,
  TOPIC_NODE_TYPE,
}
