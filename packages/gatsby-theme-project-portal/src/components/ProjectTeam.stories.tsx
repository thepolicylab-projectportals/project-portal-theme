import type { Meta, StoryObj } from "@storybook/react"
import { ProjectTeam } from "./ProjectTeam"
import * as ContactStories from "./Contact.stories"
import { contactImage } from "./Story.utilities"

const meta: Meta<typeof ProjectTeam> = {
  component: ProjectTeam,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ProjectTeam>

export const Primary: Story = {
  args: {
    title: "The Project Team",
    contacts: [ContactStories.Primary.args, ContactStories.NoEmail.args],
    defaultImage: contactImage,
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
