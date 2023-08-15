import type { Meta, StoryObj } from "@storybook/react"
import { ProjectDetail } from "./ProjectDetail"
import * as ContactStories from "./Contact.stories"
import * as ProjectTeamStories from "./ProjectTeam.stories"
import { emptyGatsbyImageData } from "./Story.utilities"

const meta: Meta<typeof ProjectDetail> = {
  component: ProjectDetail,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ProjectDetail>

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
      image: emptyGatsbyImageData,
    },
    openText: "Are you interested in collaborating?",
    ongoingText: "This project is ongoing.",
    completeText: "This project is complete.",

    projectTeam: ProjectTeamStories.Primary.args.contacts,

    faq: [{ title: "Question 1?", text: "Answer 1!" }],

    status: "open",
    opportunityCloses: new Date("2022-03-04"),
    startDate: new Date("2022-01-03"),
    endDate: new Date("2022-03-04"),
    agency: "Sample Agency",
    lastModified: new Date("2022-05-27T16:34:04.000Z"),
    topics: [{ slug: "test", title: "Test" }],
  },
}

export const Open: Story = {
  args: { ...Primary.args, status: "open" },
}

export const Ongoing: Story = {
  args: { ...Primary.args, status: "ongoing" },
}

export const Completed: Story = {
  args: { ...Primary.args, status: "completed" },
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
      image: emptyGatsbyImageData,
    },

    status: "open",
    opportunityCloses: new Date("2022-03-04"),
    startDate: new Date("2022-01-03"),
    endDate: new Date("2022-03-04"),
    agency: "Sample Agency",
    topics: [{ slug: "test", title: "Test" }],
    lastModified: new Date("2022-05-27T16:34:04.000Z"),
  },
}
