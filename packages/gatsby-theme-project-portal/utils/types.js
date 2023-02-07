// constants for Project Portal Config type
const CONFIG_NODE_TYPE = `ProjectPortalConfig`
const STATIC_TEXT_NODE_TYPE = `ProjectPortalStaticText`

const projectPortalConfigTypeDefs = `
  type ${CONFIG_NODE_TYPE} implements Node {
    siteTitle: String
    shortTitle: String
    showDevBanner: Boolean
    projectInterestLink: String
    pages: [NavbarItemType]
    recaptchaSiteKey: String
    staticText: ${STATIC_TEXT_NODE_TYPE}
  }
  type NavbarItemType {
    name: String
    link: String
    show: Boolean
  }
  type ${STATIC_TEXT_NODE_TYPE} {
    bottom_banner: BottomBannerType
    footer: FooterType
    main_contact_text: MainContactTextType
  }
  type BottomBannerType {
    text: String
    link: String
  }
  type MainContactTextType {
    ongoingText: String
    completeText: String
  }
  type FooterType {
    copyright: String
    heading: LinkType
    links: [LinkType]
  }
  type LinkType {
    title: String
    link: String
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
      title: String!
      
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

const PAGE_NODE_TYPE = `Page`
const CARD_FILTER_TYPE = `CardFilterType`
const TITLE_AND_TEXT_TYPE = `TitleAndTextType`
const pageTypeDefs = `
  interface ${PAGE_NODE_TYPE} implements Node {
    id: ID!  
    slug: String!
    
    templateKey: String
    
    pageName: String
    
    title: String
    lede: String
    
    # Card Page Options
    sortOptions: [String]
    filter: CardFilterType
    
    # Accessibility page options:
    header: String
    aims: [${TITLE_AND_TEXT_TYPE}]
    faq: [${TITLE_AND_TEXT_TYPE}]
    accessibility: String
    
  }
  type ${TITLE_AND_TEXT_TYPE} {
    title: String
    text: String
  }
  type ${CARD_FILTER_TYPE} {
    status: [String]
  }
`

module.exports = {
  projectPortalConfigTypeDefs,
  projectTypeDefs,
  contactTypeDefs,
  pageTypeDefs,
  CONFIG_NODE_TYPE,
  PROJECT_NODE_TYPE,
  CONTACT_NODE_TYPE,
  TOPIC_NODE_TYPE,
  STATIC_TEXT_NODE_TYPE,
  PAGE_NODE_TYPE,
  CARD_FILTER_TYPE,
  TITLE_AND_TEXT_TYPE,
}
