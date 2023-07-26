import type { Meta, StoryObj } from "@storybook/react"
import { ShareProject } from "./ShareProject"

const meta: Meta<typeof ShareProject> = {
  component: ShareProject,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "green",
      values: [
        { name: "black", value: "#000" },
        { name: "teal", value: "#00e0e3" },
        { name: "green", value: "#186d00" },
      ],
    },
  },
}

export default meta

type Story = StoryObj<typeof ShareProject>

export const Primary: Story = {}
