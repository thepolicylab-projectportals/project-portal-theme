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
  BottomBanner,
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

var sample_card = [
  {
    data: {
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
    },
  },
]
var staticText = "staticText"

const Index = () => {
  const { logo } = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { regex: "/rd_logo.png/" }) {
        childImageSharp {
          gatsbyImageData(width: 160)
        }
      }
    }
  `)
  const logoImage = getImage(logo)

  return (
    <>
      <DevelopmentBanner />
      <BottomBanner
        logoimage={
          <GatsbyImage
            className="inline-block"
            logoImage={logoImage}
            alt="R+D logo"
          />
        }
        text={staticText}
      />
      <BackIcon />
      <ForwardIcon />
      <ProjectStatus status="open" />
      <ProjectStatus status="ongoing" />
      <ProjectStatus status="completed" />
      <MarkdownText text={markdownContent} />
      <Feature label="Test" className="test" value={["test"]} />
      <ShareProject />
      <SectionOfItem label="Section of Items" value={markdownContent} />
      <Cards nodes={sample_card} />
    </>
  )
}

export default Index
