import React from "react"

import { ProjectDetailLayout } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const { contactImageQuery } = useStaticQuery(graphql`
    query {
      contactImageQuery: file(relativePath: { regex: "/^contactImage.png$/" }) {
        childImageSharp {
          gatsbyImageData(width: 64)
        }
      }
    }
  `)

  const contact1 = {
    employer: "Brown University",
    title: "Assistant Head of Gatsby",
    email: "gatsby@brown.edu",
    name: "Herbert Mumphrey III",
    contactImage: contactImageQuery,
    showEmail: false,
  }

  const projectDetailProps = {
    question: "Test Question?",
    partnerName: "Example",
    slug: "test-project",
    summary: "Test Summary\n",
    status: "open",
    opportunityCloses: new Date("2022-03-04"),
    startDate: new Date("2022-01-03"),
    endDate: new Date("2022-03-04"),
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
    lastModified: new Date("2022-05-27T16:34:04.000Z"),
    created: new Date("2021-11-04T15:49:30.000Z"),
    mainContact: contact1,
    emailContent: "email content here",
    collaborationType: "collaboration type is this",
    location: "here is the location",
    projectTeam: [
      contact1,
      {
        ...contact1,
        name: "Borissia Hepplethwaite",
        title: "Head of Gatsby",
      },
      { ...contact1, name: "Alyssia Allessandro", title: "Head of Graphing" },
    ],
  }

  return (
    <>
      <h1>Open</h1>
      <ProjectDetailLayout {...projectDetailProps} status="open" />
      <hr />
      <h1>Ongoing</h1>
      <ProjectDetailLayout {...projectDetailProps} status="ongoing" />
      <hr />
      <h1>Completed</h1>
      <ProjectDetailLayout {...projectDetailProps} status="completed" />
      <hr />
      <h1>No Main Contact</h1>
      <ProjectDetailLayout {...projectDetailProps} mainContact={null} />
    </>
  )
}
