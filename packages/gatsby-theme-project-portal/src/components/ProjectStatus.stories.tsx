// Ignore checks of unused exported defaults & constants as they are used implicitly by Storybook
// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react"
import { ProjectStatus } from "./ProjectStatus"

export const argType = {
  status: {
    options: ["open", "ongoing", "completed"],
    control: { type: "radio" },
  },
}
const meta: Meta<typeof ProjectStatus> = {
  component: ProjectStatus,
  tags: ["autodocs"],
  includeStories: /^[A-Z]/,
  argTypes: argType,
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
