// constants for Project Portal Config type
const CONFIG_NODE_TYPE = `ProjectPortalConfig`

const projectPortalConfigTypeDefs = `
  type ${CONFIG_NODE_TYPE} implements Node {
    siteTitle: String
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
    open: CardPageType
    ongoing: CardPageType
    completed: CardPageType
    contact: ContactType
    about: AboutType
    bottom_banner: BottomBannerType
    footer: FooterType
    main_contact_text: MainContactTextType
  }
  type CardPageType {
    lede: String
    pageName: String
    title: String
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
      topics: [String]
      
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
}
