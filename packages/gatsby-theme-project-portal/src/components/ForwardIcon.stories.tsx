import type { Meta, StoryObj } from "@storybook/react"
import { ForwardIcon } from "./ForwardIcon"

const meta: Meta<typeof ForwardIcon> = {
  component: ForwardIcon,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ForwardIcon>

export const Primary: Story = {}
