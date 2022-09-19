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
  Cards,
} from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

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
      question:
        "How can we encourage residents to follow safety and etiquette rules when using trails and parks?",
      partnerName: "San Antonio",
      slug: "trail-etiquette",
      summary:
        "We want to find out the best way to deliver information about trail etiquette and safe use rules for San Antonio parks and trails. We are interested in exploring marketing techniques to replace our current long list of park use rules, and to test the best ways to reach residents of all demographic groups (age, gender, culture).\n",
      status: "open",
      opportunityCloses: "2022-06-01",
      startDate: "2022-01-03",
      endDate: "2022-03-04",
      agency: "Parks and Recreation",
      topics: ["Parks"],
      deliverable:
        "- Proposed approaches for setting and communicating rules and trail etiquette for residents.\n- Proposed solution for communicating with current trail users.\n- Proposed solution for communicating with residents who are currently not using parks and trails.\n",
      purpose:
        "- Results will be used to inform how we deliver park and trail outreach, education, and programming.",
      expertise:
        "- Experience with marketing techniques.\n- Experience testing effectiveness of communication materials and strategies.\n",
      requirement: "None\n",
      keyDates:
        "We are ready to begin the project as soon as we identify a collaborator.\n",
      priorResearch:
        "None, but we will share project background with our selected collaborator.\n",
      statusOfData:
        "We are seeking data from the Trust for Public Lands report, a report ranking cities and their park systems, in order to compare San Antonio to other cities and improve our approach.\n",
      fundingInfo:
        "- There is funding available for new flyers and signage.\n- Full-time and temporary staff are available to work on the project.\n",
      commitment: "10 hours a week",
      contactName: "Sue DeNym",
      contactTitle: "The Boss",
      contactEmail: "me@me.com",
      lastModified: "2022-05-27T16:34:04.000Z",
      created: "2021-11-04T15:49:30.000Z",
    },
  },
]

const Index = () => {
  return (
    <>
      <DevelopmentBanner />
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
