import type { Meta, StoryObj } from "@storybook/react"
import { ProjectStatus } from "./ProjectStatus"

export const statusArgType = {
  status: {
    options: ["open", "ongoing", "completed"],
    control: { type: "radio" },
  },
}
const meta: Meta<typeof ProjectStatus> = {
  component: ProjectStatus,
  tags: ["autodocs"],
  includeStories: /^[A-Z]/,
  argTypes: statusArgType,
}

export default meta

type Story = StoryObj<typeof ProjectStatus>

export const Open: Story = {
  args: { status: "open" },
}

export const Ongoing: Story = {
  args: { status: "ongoing" },
}

export const Completed: Story = {
  args: { status: "completed" },
}
