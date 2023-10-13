import type { Meta, StoryObj } from "@storybook/react"
import { ProjectDetail } from "./ProjectDetail"
import * as ProjectTeamStories from "./ProjectTeam.stories"
import { emptyGatsbyImageData } from "./Story.utilities"
import { contactImage, contactImageYogi } from "./Contact.stories"

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
      image: contactImageYogi,
    },
    openText: "Are you interested in collaborating?",
    ongoingText: "This project is ongoing.",
    completeText: "This project is complete.",

    newsletter: {
      link: "https://ccv.brown.edu",
      text: "Subscribe for project portal updates",
    },

    projectTeam: ProjectTeamStories.Primary.args.contacts,

    faq: [{ title: "Question 1?", text: "Answer 1!" }],

    status: "open",
    opportunityCloses: new Date("2022-03-04"),
    startDate: new Date("2022-01-03"),
    endDate: new Date("2022-03-04"),
    agency: "Sample Agency",
    lastModified: new Date("2022-05-27T16:34:04.000Z"),
    topics: [{ slug: "test", title: "Test" }],

    defaultContactImage: contactImage,
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

export const TailwindXSWindow: Story = {
  args: Primary.args,
  parameters: { viewport: { defaultViewport: "tailwindXS" } },
}

export const TailwindSMWindow: Story = {
  args: Primary.args,
  parameters: { viewport: { defaultViewport: "tailwindSM" } },
}

export const TailwindMDWindow: Story = {
  args: Primary.args,
  parameters: { viewport: { defaultViewport: "tailwindMD" } },
}

export const TailwindLGWindow: Story = {
  args: Primary.args,
  parameters: { viewport: { defaultViewport: "tailwindLG" } },
}

export const TailwindXLWindow: Story = {
  args: Primary.args,
  parameters: { viewport: { defaultViewport: "tailwindXL" } },
}

export const Tailwind2XLWindow: Story = {
  args: Primary.args,
  parameters: { viewport: { defaultViewport: "tailwind2XL" } },
}
