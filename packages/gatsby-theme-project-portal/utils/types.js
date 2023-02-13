// constants for Project Portal Config type
const CONFIG_NODE_TYPE = `ProjectPortalConfig`

const projectPortalConfigTypeDefs = `
  type ${CONFIG_NODE_TYPE} implements Node {
    siteTitle: String
    shortTitle: String
    showDevBanner: Boolean
    projectInterestLink: String
    pages: [NavbarItemType]
    recaptchaSiteKey: String
    staticText: StaticTextType
  }
  type NavbarItemType {
    name: String
    link: String
    show: Boolean
  }
  type StaticTextType {
    contact: ContactType
    about: AboutType
    bottom_banner: BottomBannerType
    footer: FooterType
    main_contact_text: MainContactTextType
  }
  type ContactType {
    title: String
    lede: String
  }
  type AboutType {
    header: String
    aims: [TitleAndTextType]
    faq: [TitleAndTextType]
    accessibility: String
  }    
  type TitleAndTextType {
    title: String
    text: String
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

const CARD_PAGE_NODE_TYPE = `cardPage`
const CARD_PAGE_FILTER_TYPE = `cardPageFilter`
const pageTypeDefs = `
  interface ${CARD_PAGE_NODE_TYPE} implements Node {
    id: ID!
    slug: String!
    lede: String
    pageName: String
    title: String
    sortOptions: [String]
    filter: ${CARD_PAGE_FILTER_TYPE}
  }
  type ${CARD_PAGE_FILTER_TYPE} {
    status: [String]
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
  CARD_PAGE_NODE_TYPE,
  CARD_PAGE_FILTER_TYPE,
  pageTypeDefs,
}
