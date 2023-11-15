import type { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"

import SiteSearch from "./SiteSearch"
import lunr from "lunr"
import lodash from "lodash"

const createSearchIndex = (searchNodes) => {
  // searchNodes = {allProject[], allGeneralPage[], siteUrl}
  let documents = []
  Object.keys(searchNodes).forEach((page) => {
    if (page === "siteUrl") {
      return
    } else {
      searchNodes[page].nodes.forEach((node) => {
        let tempNode = structuredClone(node)
        if (page === "allProject") {
          if (!node.slug.includes("/")) {
            tempNode.slug = `project/${node.slug}`
          }
        }
        const newItem = Object.values(tempNode).map((field) => {
          if (lodash.isNull(field)) {
            return null
          }

          if (typeof field === "object") {
            return Object.values(field)
              .filter((value) => !lodash.isNull(value))
              .map((value) =>
                typeof value === "string"
                  ? value
                  : Object.values(value)
                      .filter((k) => !lodash.isNull(k))
                      .join(" ")
              )
              .join(" ")
          } else {
            return field
          }
        })

        Object.keys(tempNode).forEach((page, i) => {
          tempNode[page] = newItem[i]
        })
        documents.push(tempNode)
      })
    }
  })

  let index = lunr(function () {
    this.ref("slug") // identifier
    // fields to search
    this.field("slug")
    this.field("faq")
    this.field("aims")
    this.field("lede")
    this.field("title")
    this.field("question")
    this.field("status")
    this.field("agency")
    this.field("topics")
    this.field("mainContact")
    this.field("summary")
    this.field("status")
    this.field("purpose")
    this.field("emailContent")
    this.field("projectTeam")
    this.field("expertise")
    this.field("requirement")

    // allow access to the position of the found word in the field
    this.metadataWhitelist = ["position"]
    /* allow stop words (see https://github.com/olivernn/lunr.js/blob/master/lunr.js)
           we have 'about' as one of the slugs, which spurred this decision
           We can implement our own stopWordFilter:
                    var idx = lunr(function () {
                      // normal index definition
                      this.pipeline.after(lunr.stopWordFilter, myStopWordFilter)
                       this.pipeline.remove(lunr.stopWordFilter)
                    })
        */
    this.pipeline.remove(lunr.stopWordFilter)

    documents.forEach(function (doc) {
      this.add(doc)
    }, this)
  })
  return { index, documents }
}

const meta: Meta<typeof SiteSearch> = {
  component: SiteSearch,
  tags: ["autodocs"],
  includeStories: /^[A-Z]/,
}

export const exampleProjects = {
  nodes: [
    {
      title: "completed no date",
      agency: "",
      topics: "Military Facilities",
      slug: "project/completed-project-nodate",
      summary: "",
      statusOfData: "",
      status: "completed",
      startDate: null,
      requirement: "",
      question: "Completed no date",
      purpose: "",
      projectTeam: "",
      priorResearch: null,
      opportunityCloses: null,
      mainContact: "Isabel",
      fundingInfo: "",
      expertise: "",
      faq: null,
      deliverable: "",
      emailContent: "",
      endDate: null,
    },
    {
      title: "ongoing no date",
      agency: "",
      topics: "Military Facilities",
      slug: "project/ongoing-project-nodate",
      summary: "",
      statusOfData: "",
      status: "ongoing",
      startDate: null,
      requirement: "",
      question: "Ongoing no date",
      purpose: "",
      projectTeam: "",
      priorResearch: null,
      opportunityCloses: null,
      mainContact: "Isabel",
      fundingInfo: "",
      expertise: "",
      faq: null,
      deliverable: "",
      emailContent: "",
      endDate: null,
    },
    {
      title: "completed 2",
      agency: "example agency",
      topics: "Facilities",
      slug: "project/completed-project2",
      summary: "example summary",
      statusOfData: "example statusOfData",
      status: "completed",
      startDate: "2022-06-17",
      requirement: "example requirement",
      question:
        "Hello world2 (from json)? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?",
      purpose: "example purpose",
      projectTeam: "Horace I Horacia II",
      priorResearch: null,
      opportunityCloses: "2022-10-28",
      mainContact: "Horace I",
      fundingInfo: "example fundingInfo",
      expertise: "example expertise",
      faq: "We are looking for answers to specific projects. This is another question? H﻿ere's an answer for that question! Yay! Here's another question on the CMS side",
      deliverable: "example deliverable",
      emailContent: "example emailContent",
      endDate: "2016-12-15",
    },
    {
      title: "ongoing 1",
      agency: "example agency",
      topics: "Facilities",
      slug: "project/ongoing-project",
      summary: "example summary",
      statusOfData: "example statusOfData",
      status: "ongoing",
      startDate: "2022-06-17",
      requirement: "example requirement",
      question: "Hello world (from json)?",
      purpose: "example purpose",
      projectTeam: "Horace I Horacia II",
      priorResearch: null,
      opportunityCloses: "2022-10-28",
      mainContact: "Horace I",
      fundingInfo: "example fundingInfo",
      expertise: "example expertise",
      faq: null,
      deliverable: "example deliverable",
      emailContent: "example emailContent",
      endDate: "2016-12-15",
    },
    {
      title: "completed 1",
      agency: "example agency",
      topics: "Facilities",
      slug: "project/completed-project",
      summary:
        'example summary that is also testing the media folder.  \n\n![A watercolor painting of a cat laying in some leaves.](/image/cat.jpg "Cat")',
      statusOfData: "example statusOfData",
      status: "completed",
      startDate: "2022-06-17",
      requirement: "example requirement",
      question: "Hello world (from json)?",
      purpose: "example purpose",
      projectTeam: "Horacia II Horace I",
      priorResearch: null,
      opportunityCloses: "2022-10-28",
      mainContact: "Horace I",
      fundingInfo: "example fundingInfo",
      expertise: "example expertise",
      faq: null,
      deliverable: "example deliverable",
      emailContent: "example emailContent",
      endDate: "2016-12-15",
    },
    {
      title: "ongoing 2",
      agency: "example agency",
      topics: "Facilities",
      slug: "project/ongoing-project2",
      summary: "example summary",
      statusOfData: "example statusOfData",
      status: "ongoing",
      startDate: "2022-06-17",
      requirement: "example requirement",
      question: "Hello world (from json)?",
      purpose: "example purpose",
      projectTeam: "Horace I Horacia II",
      priorResearch: null,
      opportunityCloses: "2022-10-28",
      mainContact: "Horace I",
      fundingInfo: "example fundingInfo",
      expertise: "example expertise",
      faq: null,
      deliverable: "example deliverable",
      emailContent: "example emailContent",
      endDate: "2016-12-15",
    },
    {
      title: "open 2",
      agency: "example agency",
      topics: "Technologies Facilities",
      slug: "project/open-project-2",
      summary: "example summary",
      statusOfData: "example statusOfData",
      status: "open",
      startDate: "2022-06-17",
      requirement: "example requirement",
      question: "Hello world (from json)?",
      purpose: "example purpose",
      projectTeam: "",
      priorResearch: null,
      opportunityCloses: "2022-10-28",
      mainContact: "Isabel",
      fundingInfo: "example fundingInfo",
      expertise: "example expertise",
      faq: null,
      deliverable: "example deliverable",
      emailContent: "example emailContent",
      endDate: "2016-12-15",
    },
    {
      title: "Open Project 3",
      agency: "example agency",
      topics: "Security Public Health",
      slug: "project/open-project3",
      summary: "example summary",
      statusOfData: "example statusOfData",
      status: "open",
      startDate: "2022-06-17",
      requirement: "example requirement",
      question: "Open Project 3",
      purpose: "example purpose",
      projectTeam: "Horace I Horacia II",
      priorResearch: null,
      opportunityCloses: "2022-10-28",
      mainContact: "Horace I",
      fundingInfo: "example fundingInfo",
      expertise: "example expertise",
      faq: null,
      deliverable: "example deliverable",
      emailContent: "example emailContent",
      endDate: "2016-12-15",
    },
    {
      title: "open no date",
      agency: "",
      topics: "Military Facilities",
      slug: "project/open-project-nodate",
      summary: "",
      statusOfData: "",
      status: "open",
      startDate: null,
      requirement: "",
      question: "Open no date",
      purpose: "",
      projectTeam: "",
      priorResearch: null,
      opportunityCloses: null,
      mainContact: "Isabel",
      fundingInfo: "",
      expertise: "",
      faq: null,
      deliverable: "",
      emailContent: "",
      endDate: null,
    },
    {
      title: "Open Project 5",
      agency: "example agency",
      topics: "Facilities Public Health",
      slug: "project/open-project5",
      summary: "example summary",
      statusOfData: "example statusOfData",
      status: "open",
      startDate: "2022-06-17",
      requirement: "example requirement",
      question: "0123456789 abcdefghijklmnop 26 chars/1 space",
      purpose: "example purpose",
      projectTeam: "Horace I Horacia II",
      priorResearch: null,
      opportunityCloses: "2022-10-28",
      mainContact: "Horace I",
      fundingInfo: "example fundingInfo",
      expertise: "example expertise",
      faq: null,
      deliverable: "example deliverable",
      emailContent: "example emailContent",
      endDate: "2016-12-15",
    },
    {
      title: "Open Project 6",
      agency: "example agency",
      topics: "Technologies Military Security",
      slug: "project/open-project6",
      summary: "example summary",
      statusOfData: "example statusOfData",
      status: "open",
      startDate: "2022-06-17",
      requirement: "example requirement",
      question: "012 3 45 67 89 ab cd efg hij klm 23 chars/9 spaces",
      purpose: "example purpose",
      projectTeam: "Horace I Horacia II",
      priorResearch: null,
      opportunityCloses: "2022-10-28",
      mainContact: "Horace I",
      fundingInfo: "example fundingInfo",
      expertise: "example expertise",
      faq: null,
      deliverable: "example deliverable",
      emailContent: "example emailContent",
      endDate: "2016-12-15",
    },
    {
      title: "open 1",
      agency: "example agency",
      topics: "Military Facilities",
      slug: "project/open-project",
      summary: "example summary",
      statusOfData: "example statusOfData",
      status: "open",
      startDate: "2022-06-17",
      requirement: "example requirement",
      question: "Hello world (from json)?",
      purpose: "example purpose",
      projectTeam: "Horace I Horacia II",
      priorResearch: null,
      opportunityCloses: "2022-10-28",
      mainContact: "Isabel",
      fundingInfo: "example fundingInfo",
      expertise: "example expertise",
      faq: null,
      deliverable: "example deliverable",
      emailContent: "example emailContent",
      endDate: "2016-12-15",
    },
    {
      title: "Open Project 4",
      agency: "example agency",
      topics: "Security",
      slug: "project/open-project4",
      summary: "example summary",
      statusOfData: "example statusOfData",
      status: "open",
      startDate: "2022-06-17",
      requirement: "example requirement",
      question: "012 345 6789 ab cd efg hij klmn 24 chars/7 spaces",
      purpose: "example purpose",
      projectTeam: "Horace I Horacia II",
      priorResearch: null,
      opportunityCloses: "2022-10-28",
      mainContact: "Horace I",
      fundingInfo: "example fundingInfo",
      expertise: "example expertise",
      faq: null,
      deliverable: "example deliverable",
      emailContent: "example emailContent",
      endDate: "2016-12-15",
    },
  ],
}

export const exampleGenPages = {
  nodes: [
    {
      slug: "about",
      lede: null,
      faq: "We are looking for academic and scientific researchers from a range of disciplines relevant to policy and program design and evaluation. Example disciplines include public policy, economics, behavioral science, sociology, marketing, data analytics, and law, but we encourage you to apply for any opportunity that you think would be a good fit for you or your team. Where possible, project summaries include information about what types of expertise are likely needed, but if you have an idea for how to contribute that is different or not stated in the summary, please let us know. What sort of collaborators are you looking for? No, but prior experience is helpful. Applied research and collaboration with government partners often requires more flexibility and communication than a lab-based or retrospective study, so be sure to discuss expectations and timeline when considering a collaboration opportunity. Do I need to have prior experience working with government? It depends on the project, so check out the project description to learn more about expectations and requirements. Opportunities typically require a PhD or equivalent experience. Those challenges open to student participation will usually state so in the announcement. Are these opportunities available for students? Needs vary from project to project with respect to expertise needed, project scope, timeline, and other factors. Each project summary page describes expectations and requirements for that project. When appropriate and feasible, the City of San Antonio encourages collaboration within or across organizations. If you are interested in working with a team, please indicate this on the interest form for the project for further discussion. Can multiple people work on a project? Some projects have dedicated funding, others may not have funding available at this time, and some may be open to funding from external sources. The extent and source of funding will depend on the scope of the project, level of expertise needed, and other factors. Research partners, City department representatives, and the Office of Innovation can discuss funding details on a case-by-case basis, including needs and potential sources. What kind of funding is available? Data availability depends on the specific project. Projects may involve qualitative and quantitative data, and collecting or analyzing data. In many cases, academic collaborators will need to sign a Data Use Agreement in order to access and use existing government data. What kind of data is available? After we collect expressions of interest, City departments, research partners, and the Office of Innovation will work together to determine fit and how to best approach the project. Some projects may have a Q&A session to provide more information and some may require a more detailed submission process. The City of San Antonio prioritizes partnerships that are scalable, sustainable, and develop public, open-source resources. What happens after I submit an interest form? The City of San Antonio is always interested in exploring government–research partnerships or other cross-sector collaborative opportunities for improving City services. If you have a research idea, please search us at [rdleague@sanantonio.gov](mailto:rdleague@sanantonio.gov) with a description of your idea. The description should include, at a minimum, a project overview, how the results would benefit residents of San Antonio, and an estimated project timeline. We’ll get in touch to discuss if it’s a good fit for the portal. Can I propose a project idea? The R&D League is a partnership established to build a research and development (R&D) program in the City of San Antonio that paves the path to a better future for our community. The League creates opportunities for cross-sector, multi-disciplinary teams to utilize scientific methods and data to investigate new ideas, facilitate evidence-based policymaking, and explore the frontier of innovation for our 1.5 million residents.\n\nCore League members are the City of San Antonio (CoSA), Southwest Research Institute (SwRI), United Services Automobile Association (USAA), the University of Texas at San Antonio (UTSA), and The Policy Lab @ Brown University. [Learn more about the R&D League](https://www.sanantonio.gov/Innovation/R-D-League).\n What is the R&D League?",
      aims: "The Research Partnerships Portal is a pilot initiative from the City of San Antonio’s Office of Innovation and multiple City departments. Our goal is to connect City departments and offices with San Antonio's research and philanthropic sectors to answer important questions about how to best design, deliver, and evaluate city services. We believe that evidence is an important part of improving public services and policy, and we're excited about what we can do together! Build and use evidence to improve the lives of San Antonio residents. We believe that great work is built from lasting relationships. We're looking for thought partners, not just evaluators, and seek collaborators from a wide variety of research disciplines. Project opportunities may include problem framing, introduction to existing research, intervention and evaluation design, technical assistance, reporting, and other research and collaboration areas. Promote durable partnerships at all stages of the learning process. Applied research on a specific challenge has the potential to benefit public services as a whole. To do this, we need to be transparent with our results and methods. We know that publication is an important part of the research process, and will work with collaborators to support publication where appropriate. Share knowledge about what works.",
      title: "About the Project Portal",
    },
    {
      slug: "contact",
      lede: "Our team is happy to answer questions about the partnerships pilot, project-specific questions, general questions about working with the City of San Antonio, and ideas for how we can improve this site.",
      faq: null,
      aims: null,
      title:
        "Want to talk to the Office of Innovation? We'd love to hear from you!",
    },
    {
      slug: "search",
      lede: null,
      faq: null,
      aims: null,
      title: "Search the Whole Site!",
    },
  ],
}

const { index, documents } = createSearchIndex({
  exampleProjects,
  exampleGenPages,
})
const db = documents.reduce(function (acc, document) {
  acc[document.slug] = document
  return acc
}, {})

export const primaryData = {
  siteUrl: "localhost",
  index: index,
  db: db,
}

export default meta

type Story = StoryObj<typeof SiteSearch>
export const Primary: Story = {
  args: primaryData,
}

export const ValidSearches: Story = {
  args: primaryData,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const searchInput = canvas.getByLabelText("Search")

    await userEvent.type(searchInput, "about", {
      delay: 500,
    })

    await userEvent.clear(searchInput)

    await userEvent.type(searchInput, "project", {
      delay: 500,
    })
  },
}

export const InvalidSearches: Story = {
  args: primaryData,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const searchInput = canvas.getByLabelText("Search")

    await userEvent.type(searchInput, "%about%", {
      delay: 500,
    })

    await userEvent.clear(searchInput)

    await userEvent.type(searchInput, "😋", {
      delay: 500,
    })

    await userEvent.clear(searchInput)

    await userEvent.type(searchInput, "ひらがな", {
      delay: 500,
    })

    await userEvent.clear(searchInput)

    await userEvent.type(searchInput, "𒐫", {
      delay: 500,
    })

    await userEvent.clear(searchInput)

    await userEvent.type(searchInput, "____", {
      delay: 500,
    })
  },
}
