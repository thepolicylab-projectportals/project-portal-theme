// Ignore checks of unused exported defaults & constants as they are used implicitly by Storybook
// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react"
import { ProjectPage } from "./ProjectPage"
import * as CardsStories from "./Cards.stories"
import { loadImage } from "./Story.utilities"

const meta: Meta<typeof ProjectPage> = {
  component: ProjectPage,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ProjectPage>

export const Primary: Story = {
  args: {
    title: "All Projects",
    lede: "Introduction to the all projects page.",
    allProjects: [
      ...CardsStories.Primary.args.nodes,
      ...CardsStories.Primary.args.nodes,
    ],
    sortOptions: ["created", "opportunityCloses", "startDate", "endDate"],
    image: loadImage("image/background.jpg"),
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
