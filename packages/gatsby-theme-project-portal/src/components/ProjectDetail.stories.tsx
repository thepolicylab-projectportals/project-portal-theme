import type { Meta, StoryObj } from "@storybook/react"
import { ProjectDetail } from "./ProjectDetail"
import * as ProjectTeamStories from "./ProjectTeam.stories"
import * as NewsletterStories from "./Newsletter.stories"
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

    newsletter: NewsletterStories.Primary.args,

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

export const LongTitle: Story = {
  args: {
    title: "completed 2",
    agency: "example agency",
    topics: [],
    slug: "project/completed-project",
    summary: "example project summary",
    statusOfData: "example statusOfData",
    status: "completed",
    startDate: new Date("2022-06-17"),
    requirement: "example requirement",
    question:
      "Hello world2 (from json)? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?",
    purpose: "example purpose",
    projectTeam: ProjectTeamStories.Primary.args.contacts,
    priorResearch: null,
    opportunityCloses: new Date("2022-10-28"),
    mainContact: {
      name: "Contact Name",
      title: "Title",
      employer: "Employer",
      email: "some-email@example.com",
      image: contactImageYogi,
    },
    fundingInfo: "example fundingInfo",
    expertise: "example expertise",
    faq: [
      { title: "Question 1?", text: "Answer 1!" },
      {
        title: "This is another different question?",
        text: "Here's an answer for that question! Yay!",
      },
    ],
    deliverable: "example deliverable",
    emailContent: "example emailContent",
    endDate: new Date("2016-12-15"),
  },
}

export const NullValues: Story = {
  args: {
    title: "project completed 2",
    agency: "example agency",
    topics: [],
    slug: "project/completed-project2",
    summary: "",
    statusOfData: null,
    status: "completed",
    startDate: new Date("2022-06-17"),
    requirement: null,
    question: "",
    purpose: null,
    projectTeam: ProjectTeamStories.Primary.args.contacts,
    priorResearch: null,
    opportunityCloses: new Date("2022-10-28"),
    mainContact: {
      name: "Contact Name",
      title: "Title",
      employer: "Employer",
      email: "some-email@example.com",
      image: contactImageYogi,
    },
    keyDates: null,
    fundingInfo: null,
    expertise: null,
    faq: null,
    deliverable: null,
    emailContent: null,
    endDate: new Date("2016-12-15"),
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            // The top H1 heading is missing – ignore here
            id: "empty-heading",
            enabled: false,
          },
          {
            // Because there's no content in the overview, the contact heading order is broken
            id: "heading-order",
            enabled: false,
          },
        ],
      },
    },
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

export const Maximum: Story = {
  args: {
    question: "Is there a difference between brown sugar and white sugar?",
    summary:
      "Contrary to common belief, they are nutritionally similar. Nutritionally speaking, all natural sugars have relatively comparable nutritional value with approximately 15 calories per teaspoon (4.2 g).\n",
    title: "Sugar Investigations in the US",
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
    agency: "Sugar Agency",
    topics: [
      { slug: "conspiracy", title: "conspiracy" },
      { slug: "investigation", title: "investigation" },
    ],
    lastModified: new Date("2022-05-27T16:34:04.000Z"),
    slug: "project/sugar-investigations",
    emailContent:
      "Dearest community, Are you interested in knowing about sugars? So are we! Join our search!",
    deliverable:
      "Analysis of existing sugars in the United States. Summary of and detailed recommendations and potential action steps to inform the public about the sugars they are consuming.  \\n* See project summary for additional information.",
    purpose:
      "Results will be shared with the FDA and whoever else wants these results. We have no oversight and thus may do as we wish.",
    expertise:
      "While our team does not have previous experience in organic chemistry, we are committed to uncovering the truth.",
    requirement: "I do not understand this question. Next.",
    keyDates: "Publish data at some point in time.",
    priorResearch: "Prior research is published in many reputable journals.",
    statusOfData: "Data collection has not begun.",
    fundingInfo:
      "Our team will evaluate whether or not a project needs money, and we will most likely need the project team to figure out funding.",
    openText: "Are you interested in collaborating?",
    ongoingText: "This project is ongoing.",
    completeText: "This project is complete.",
    projectTeam: ProjectTeamStories.Primary.args.contacts,
    faq: [
      { title: "Question 1?", text: "Answer 1!" },
      {
        title: "This is another question?",
        text: "Here's an answer for that question! Yay!",
      },
    ],
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
