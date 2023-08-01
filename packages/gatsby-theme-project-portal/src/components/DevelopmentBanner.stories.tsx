import type { Meta, StoryObj } from "@storybook/react"
import { DevelopmentBanner } from "./DevelopmentBanner"

const meta: Meta<typeof DevelopmentBanner> = {
  component: DevelopmentBanner,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof DevelopmentBanner>

export const Primary: Story = {}
