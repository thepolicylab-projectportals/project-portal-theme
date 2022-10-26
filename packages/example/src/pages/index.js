import React from "react"
import {
  BackIcon,
  ForwardIcon,
  DevelopmentBanner,
  ProjectStatus,
  MarkdownText,
  Feature,
  ShareProject,
  SectionOfItem,
  Card,
  Cards,
  Contact,
  CollaboratorDetails,
  NavbarLayout,
  Navbar,
  SiteMetadata,
  FooterLayout,
  Footer,
  BottomBannerLayout,
  BottomBanner,
  ProjectTeam,
  HeaderWithImage,
  ProjectDetailLayout,
  MainContact,
  ProjectPage,
} from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

import { ContactForm } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/pages/contact"

import { useStaticQuery, graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"

var markdownContent = `

# Example Markdown Content

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit ac nunc et aliquet. 

## Heading 2

In tristique dolor porttitor magna tincidunt blandit. Suspendisse vel orci ut nisi molestie finibus sed sodales elit. 

### Heading 3

Maecenas eget facilisis risus. Nunc dignissim ante nec mauris sollicitudin, ac aliquam turpis ullamcorper. 
`

const sample_card = {
  question: "Test Question?",
  partnerName: "Example",
  slug: "test-project",
  summary: "Test Summary\n",
  status: "open",
  opportunityCloses: "2022-03-04",
  startDate: "2022-01-03",
  endDate: "2022-03-04",
  agency: "Sample Agency",
  topics: ["Test"],
  deliverable: "- Test.\n- Test.\n- Test.\n",
  purpose: "- Sample.",
  expertise: "- Testing.\n- Testing.\n",
  requirement: "None\n",
  keyDates:
    "We are ready to begin the project as soon as we identify a collaborator.\n",
  priorResearch:
    "None, but we will share project background with our selected collaborator.\n",
  statusOfData: "Testing\n",
  fundingInfo: "- Test.\n- Test.\n",
  commitment: "10 hours a week",
  lastModified: "2022-05-27T16:34:04.000Z",
}

const sample_cards = [
  sample_card,
  { ...sample_card, ...{ status: "ongoing" } },
  { ...sample_card, ...{ status: "completed" } },
]

const pages = [
  {
    name: "First Nav",
    link: "/",
    show: true,
  },
  {
    name: "Second Nav",
    link: "/ongoing",
    show: true,
  },
  {
    name: "Not-Shown Nav",
    link: "/missing",
    show: false,
  },
]
const footerProps = {
  heading: {
    title: "footer:title:name",
    link: "https://www.google.com/",
  },
  copyright: "footer copyright",
  links: [
    {
      title: "Office 1",
      link: "http://www.google.com",
    },
    {
      title: "Office 2",
      link: "http://www.google.com",
    },
  ],
}

const collaborator_details = {
  expertise: "- Collaborator.\n- Details.\n- Expertise.\n",
  requirement: "Must be a collaborator\n",
  keyDates:
    "We are ready to begin the project as soon as we identify a collaborator.\n",
}

const contact1 = {
  employer: "Brown University",
  title: "Assistant Head of Gatsby",
  email: "gatsby@brown.edu",
  name: "Herbert Mumphrey III",
  image: null,
  showEmail: false,
}

const projectContacts = [
  contact1,
  {
    ...contact1,
    name: "Borissia Hepplethwaite",
    title: "Head of Gatsby",
  },
  { ...contact1, name: "Alyssia Allessandro", title: "Head of Graphing" },
]

const link = "https://www.nc.gov/terms"
const linkId = "r-and-d-link"

const Index = () => {
  const {
    logo,
    BottomBanner: bottomBannerImageQuery,
    FooterImageQuery,
    contact,
    HeaderImage,
  } = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { regex: "/^logo.png$/" }) {
        childImageSharp {
          gatsbyImageData(width: 64)
        }
      }
      contact: file(relativePath: { regex: "/^contactImage.png$/" }) {
        childImageSharp {
          gatsbyImageData(width: 64)
        }
      }
      BottomBanner: file(relativePath: { regex: "/^bottom_banner.png$/" }) {
        childImageSharp {
          gatsbyImageData(width: 160)
        }
      }
      FooterImageQuery: file(relativePath: { regex: "/^footer.png$/" }) {
        childImageSharp {
          gatsbyImageData(height: 64)
        }
      }
      HeaderImage: file(relativePath: { regex: "/^logo.png$/" }) {
        childImageSharp {
          resize(width: 1536) {
            src
          }
        }
      }
    }
  `)

  const navbarLogoImage = getImage(logo)
  const bottomBannerImage = getImage(bottomBannerImageQuery)
  const headerImageSrc = HeaderImage.childImageSharp.resize.src
  const footerImage = getImage(FooterImageQuery)

  const allProjects = [
    {
      question: "Hello world (from json)?",
      slug: "completed-project",
      status: "completed",
      summary: "example summary",
      deliverable: "example deliverable",
      expertise: "example expertise",
      keyDates: "example keyDates",
      endDate: "2016-12-15",
      agency: "example agency",
      topics: ["example topics"],
      statusOfData: "example statusOfData",
      priorResearch: null,
      fundingInfo: "example fundingInfo",
      lastModified: "Invalid date",
    },
    {
      question: "Hello world2 (from json)?",
      slug: "completed-project-2",
      status: "completed",
      summary: "example summary",
      deliverable: "example deliverable",
      expertise: "example expertise",
      keyDates: "example keyDates",
      endDate: "2016-12-15",
      agency: "example agency",
      topics: ["example topics"],
      statusOfData: "example statusOfData",
      priorResearch: null,
      fundingInfo: "example fundingInfo",
      lastModified: "Invalid date",
    },
  ]

  return (
    <>
      <DevelopmentBanner />
      {/*Normal Navbar:*/}
      <NavbarLayout
        title="Example Site"
        label="test"
        image={navbarLogoImage}
        pages={pages}
      />
      {/*Navbar with Active Page:*/}
      <NavbarLayout
        title="Example Site"
        label="test"
        image={navbarLogoImage}
        pages={pages}
        activePage="First Nav"
      />
      {/*Bottom banner image, text and link:*/}
      <BottomBannerLayout
        image={bottomBannerImage}
        text="Sample text"
        link={link}
        linkId={linkId}
      />
      {/*Bottom banner image, text:*/}
      <BottomBannerLayout
        image={bottomBannerImage}
        text="Sample text"
        linkId={linkId}
      />
      <BottomBannerLayout text="Sample text" link={link} linkId={linkId} />
      <BottomBannerLayout text="Sample text" linkId={linkId} />
      {/*Bottom banner using staticText:*/}
      <BottomBanner />
      <BackIcon />
      <ForwardIcon />
      <ProjectStatus status="open" />
      <ProjectStatus status="ongoing" />
      <ProjectStatus status="completed" />
      <MarkdownText text={markdownContent} />
      <Feature label="Test" className="test" value={["test"]} />
      <ShareProject />
      <SectionOfItem label="Section of Items" value={markdownContent} />
      <Card {...sample_card} />
      <Cards nodes={sample_cards} />
      {/*Contact with Show Email*/}

      <Contact
        employer={"testEmployer"}
        title={"contact1Title"}
        email={"user1@example.com"}
        name={"contact1"}
        image={bottomBannerImage}
        showEmail={true}
      />
      {/*Contact with Hide Email*/}
      <Contact
        employer={"testEmployer"}
        title={"contact2Title"}
        email={"user2@example.com"}
        name={"contact2"}
        image={contact}
        showEmail={false}
      />
      {/*Contact with Hide Email*/}
      <Contact
        employer={"testEmployer"}
        title={"noImageContact"}
        email={"user3@example.com"}
        name={"contact3"}
        showEmail={true}
      />

      <MainContact
        name={"test name"}
        title={"contactNewTitle"}
        employer={"testEmployer"}
        email={"user2@example.com"}
        image={contact}
        status={"open"}
        emailContent={"test content"}
      />
      <MainContact
        name={"test name 1"}
        title={"contact2Title"}
        employer={"testEmployer 1"}
        email={"user2@example.com"}
        status={"open"}
      />
      <MainContact
        name={"test name 3"}
        title={"contact2Title"}
        employer={"testEmployer 3"}
        email={"user3@example.com"}
        status={"completed"}
      />
      <MainContact
        name={"test name"}
        title={"contactNewTitle"}
        employer={"testEmployer"}
        email={"user2@example.com"}
        image={contact}
        status={"open"}
      />
      <MainContact
        {...contact1}
        status="open"
        emailContent="email content (open)"
      />
      <MainContact
        {...contact1}
        status="ongoing"
        emailContent="email content ongoing (unused)"
      />
      <MainContact
        {...contact1}
        status="completed"
        emailContent="email content completed (unused)"
      />
      {/*Normal Case for Collaborator Details*/}
      <CollaboratorDetails {...collaborator_details} />
      {/*No Collaborator Details*/}
      <CollaboratorDetails />
      {/*Minimal data – one field only*/}
      <CollaboratorDetails expertise={"Expertise only"} />
      <CollaboratorDetails requirement={"Requirement only"} />
      <CollaboratorDetails keyDates={"Key dates only"} />
      <div style={{ backgroundColor: "black" }}>
        <FooterLayout
          image={{ imageData: footerImage, altText: "San Antonio Logo" }}
          {...footerProps}
        />
      </div>

      <FooterLayout {...footerProps} />

      <FooterLayout
        heading={{
          title: "CCV Project Portal",
          link: "https://thepolicylab.brown.edu",
        }}
        copyright="© 2022 Brown University"
        links={[]}
      />
      <Contact {...contact1} />
      <ProjectTeam
        title="all the project team are here today"
        contacts={projectContacts}
      />
      <SiteMetadata />
      <HeaderWithImage
        title={"test title"}
        imageSrc={headerImageSrc}
        lede={"test lede"}
      />
      <div>
        ____________________________TEST__PROJECT__DETAIL__OPEN____________________________
      </div>
      <ProjectDetailLayout
        {...sample_card}
        mainContact={contact1}
        projectTeam={projectContacts}
        emailContent={"test content"}
      />
      <div>
        ___________________________TEST__PROJECT__DETAIL__OPEN___No__Application__Details________________
      </div>
      <ProjectDetailLayout
        question={sample_card.question}
        summary={sample_card.summary}
        status={sample_card.status}
        opportunityCloses={sample_card.opportunityCloses}
        startDate={sample_card.startDate}
        endDate={sample_card.endDate}
        agency={sample_card.agency}
        topics={sample_card.topics}
        deliverable={sample_card.deliverable}
        purpose={sample_card.purpose}
        priorResearch={sample_card.priorResearch}
        statusOfData={sample_card.statusOfData}
        fundingInfo={sample_card.fundingInfo}
        lastModified={sample_card.lastModified}
        created={sample_card.created}
        projectTeam={projectContacts}
        emailContent={"test content"}
      />
      <div>
        ____________________________TEST__PROJECT__DETAIL__Completed______________________________________
      </div>
      <ProjectDetailLayout
        {...sample_card}
        mainContact={contact1}
        projectTeam={projectContacts}
        emailContent={"test content"}
        status={"completed"}
      />
      <div>
        _____________________________TEST__PROJECT__DETAIL__Ongoing_______________________________________
      </div>
      <ProjectDetailLayout
        question={sample_card.question}
        status={"ongoing"}
        opportunityCloses={sample_card.opportunityCloses}
        startDate={sample_card.startDate}
        endDate={sample_card.endDate}
        agency={sample_card.agency}
        priorResearch={sample_card.priorResearch}
        statusOfData={sample_card.statusOfData}
        fundingInfo={sample_card.fundingInfo}
        lastModified={sample_card.lastModified}
        created={sample_card.created}
        emailContent={"test content"}
      />
      <Footer />
      <Navbar />
      <ContactForm />
      <ProjectPage
        allProjects={allProjects}
        bgImage={headerImageSrc}
        title={"sample title"}
        lede={"sample lede"}
        sortOptions={["endDate", "created"]}
      />
      <ProjectPage
        allProjects={[]}
        bgImage={headerImageSrc}
        title={"sample title"}
        lede={"sample lede"}
        sortOptions={["endDate", "created"]}
      />
    </>
  )
}

export default Index
