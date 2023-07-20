import type { Meta, StoryObj } from "@storybook/react"
import { Accordion } from "./Accordion"

const meta: Meta<typeof Accordion> = {
  component: Accordion,
}

export default meta

type Story = StoryObj<typeof Accordion>

export const Primary: Story = {
  args: { title: "A title", text: "The text" },
}
