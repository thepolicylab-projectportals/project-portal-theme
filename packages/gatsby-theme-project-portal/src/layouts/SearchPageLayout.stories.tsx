import type { Meta, StoryObj } from "@storybook/react"
import { SearchPageLayout } from "./SearchPageLayout"
import { contactImage } from "../components/Contact.stories"
import * as ProjectTeamStories from "../components/ProjectTeam.stories"

const meta: Meta<typeof SearchPageLayout> = {
  component: SearchPageLayout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof SearchPageLayout>

export const Primary: Story = {
  args: {
    data: {
      allGeneralPage: {
        nodes: {
          slug: "/about",
          lede: "About the Tests",
          aims: [
            {
              title: "About Aim",
              text: "Some text",
            },
          ],
          faq: [
            {
              title: "Is this an FAQ question?",
              text: "Yes, and here is the answer.",
            },
          ],
          title: null,
        },
      },
      allProject: {
        nodes: {
          slug: "/test",
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
          emailContent: "- Testing.\n- Testing.\n",
          mainContact: {
            name: "Contact Name",
            title: "Title",
            employer: "Employer",
            email: "some-email@example.com",
          },

          projectTeam: ProjectTeamStories.Primary.args.contacts,

          faq: [{ text: "Answer 1!", title: "Question 1?" }],

          status: "open",
          opportunityCloses: new Date("2022-03-04"),
          startDate: new Date("2022-01-03"),
          endDate: new Date("2022-03-04"),
          agency: "Sample Agency",
          lastModified: new Date("2022-05-27T16:34:04.000Z"),
          topics: [{ slug: "test", title: "Test" }],
        },
      },
      site: { siteMetadata: { siteUrl: "https://localhost" } },
    },
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
