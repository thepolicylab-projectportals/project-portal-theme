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
  CollaboratorDetails,
  NavbarLayout,
  BottomBannerLayout,
} from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

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
  contactName: "Sue DeNym",
  contactTitle: "The Boss",
  contactEmail: "me@me.com",
  lastModified: "2022-05-27T16:34:04.000Z",
  created: "2021-11-04T15:49:30.000Z",
}

const sample_cards = [
  {
    data: sample_card,
  },
  {
    data: { ...sample_card, ...{ status: "ongoing" } },
  },
  {
    data: { ...sample_card, ...{ status: "completed" } },
  },
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

const collaborator_details = {
  expertise: "- Collaborator.\n- Details.\n- Expertise.\n",
  requirement: "Must be a collaborator\n",
  keyDates:
    "We are ready to begin the project as soon as we identify a collaborator.\n",
}

const Index = () => {
  const { logo, BottomBanner } = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { regex: "/^logo.png$/" }) {
        childImageSharp {
          gatsbyImageData(width: 64)
        }
      }
      BottomBanner: file(relativePath: { regex: "/^rd_logo.png$/" }) {
        childImageSharp {
          gatsbyImageData(width: 160)
        }
      }
    }
  `)
  const link = "https://www.nc.gov/terms"
  const navbarLogoImage = getImage(logo)
  const bannerLogoImage = getImage(BottomBanner)
  const nav_image = (
    <GatsbyImage
      className="hidden xl:inline-block"
      image={navbarLogoImage}
      alt={"nav_logo"}
    />
  )
  const banner_image = (
    <GatsbyImage
      className="hidden xl:inline-block"
      image={bannerLogoImage}
      alt={"nav_logo"}
    />
  )
  return (
    <>
      <DevelopmentBanner />
      {/*Normal Navbar:*/}
      <NavbarLayout
        title="Example Site"
        label="test"
        image={nav_image}
        pages={pages}
      />
      {/*Navbar with Active Page:*/}
      <NavbarLayout
        title="Example Site"
        label="test"
        image={nav_image}
        pages={pages}
        activePage="First Nav"
      />
      <BottomBannerLayout image={banner_image} text="Sample text" link={link} />
      <BottomBannerLayout image={banner_image} text="Sample text" />
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
      {/*Normal Case for Collaborator Details*/}
      <CollaboratorDetails {...collaborator_details} />
      {/*No Collaborator Details*/}
      <CollaboratorDetails />
      {/*Minimal data – one field only*/}
      <CollaboratorDetails expertise={"Expertise only"} />
      <CollaboratorDetails requirement={"Requirement only"} />
      <CollaboratorDetails keyDates={"Key dates only"} />
    </>
  )
}

export default Index
