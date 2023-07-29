import type { Meta, StoryObj } from "@storybook/react"
import { ProjectDetailLayout } from "./ProjectDetail"
import * as ContactStories from "./Contact.stories"
import * as ProjectTeamStories from "./ProjectTeam.stories"
import { emptyGatsbyImageData } from "./Story.utilities"
import { contactImage, contactImageYogi } from "./Contact.stories"

const meta: Meta<typeof ProjectDetailLayout> = {
  component: ProjectDetailLayout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ProjectDetailLayout>

export const Primary: Story = {
  args: {
    question: "Test Question?",
    summary: "Test Summary\n",
    title: "The Title",

    deliverable: "- Test.\n- Test.\n- Test.\n",
    purpose: "- Sample.",
    fundingInfo: "- Test.\n- Test.\n",
    statusOfData: "Testing\n",
    priorResearch:
      "None, but we will share project background with our selected collaborator.\n",

    expertise: "- Testing.\n- Testing.\n",
    requirement: "None\n",
    keyDates:
      "We are ready to begin the project as soon as we identify a collaborator.\n",

    mainContact: {
      name: "Contact Name",
      title: "Title",
      employer: "Employer",
      email: "some-email@example.com",
      image: contactImage,
    },
    emailContent: "Are you interested in collaborating?",

    projectTeam: ProjectTeamStories.Primary.args.contacts,

    faq: [{ title: "Question 1?", text: "Answer 1!" }],

    status: "open",
    opportunityCloses: new Date("2022-03-04"),
    startDate: new Date("2022-01-03"),
    endDate: new Date("2022-03-04"),
    agency: "Sample Agency",
    lastModified: new Date("2022-05-27T16:34:04.000Z"),
    topics: [{ slug: "test", title: "Test" }],

    projectInterestLink: "https://ccv.brown.edu",
    mainContactOngoingText: "The project is ongoing",
    mainContactCompleteText: "The project is finished",

    defaultContactImage: contactImageYogi,
  },
}

export const Minimum: Story = {
  args: {
    question: "Test Question?",
    summary: "Test Summary\n",
    title: "The Title",

    mainContact: {
      name: "Contact Name",
      title: "Title",
      employer: "Employer",
      email: "some-email@example.com",
      image: null,
    },

    status: "open",
    opportunityCloses: new Date("2022-03-04"),
    startDate: new Date("2022-01-03"),
    endDate: new Date("2022-03-04"),
    agency: "Sample Agency",
    topics: [{ slug: "test", title: "Test" }],
    lastModified: new Date("2022-05-27T16:34:04.000Z"),
    projectInterestLink: null,
    mainContactOngoingText: "The project is ongoing",
    mainContactCompleteText: "The project is finished",
  },
}

export const NoMainContactImage: Story = {
  args: {
    defaultContactImage: contactImageYogi,
    mainContact: {
      image: null,
    },
  },
}

export const WithMainContactImage: Story = {
  args: {
    defaultContactImage: contactImageYogi,
    mainContact: {
      image: contactImage,
    },
  },
}
