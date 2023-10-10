import type { Meta, StoryObj } from "@storybook/react"
import { ProjectDetailPage } from "./ProjectDetailPage"
import * as ProjectDetailLayoutStories from "../components/ProjectDetail.stories"
import { contactImageYogi } from "../components/Contact.stories"

const meta: Meta<typeof ProjectDetailPage> = {
  component: ProjectDetailPage,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ProjectDetailPage>

export const Primary: Story = {
  args: {
    data: {
      project: {
        slug: "the-project",
        ...ProjectDetailLayoutStories.Primary.args,
      },
      projectPortalConfig: {
        projectInterestLink: "https://ccv.brown.edu",
        staticText: {
          mainContact: {
            ongoingText: "ongoingText",
            completeText: "completeText",
          },
        },
      },
      defaultContactImage: contactImageYogi,
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
