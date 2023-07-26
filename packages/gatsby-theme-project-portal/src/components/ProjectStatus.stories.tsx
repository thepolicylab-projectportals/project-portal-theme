import type { Meta, StoryObj } from "@storybook/react"
import { ProjectStatus } from "./ProjectStatus"
import { statusArgType } from "./Story.utilities"

const meta: Meta<typeof ProjectStatus> = {
  component: ProjectStatus,
  tags: ["autodocs"],
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
