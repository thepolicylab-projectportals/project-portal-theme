// Ignore checks of unused exported defaults & constants as they are used implicitly by Storybook
// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react"
import { DevelopmentBanner } from "./DevelopmentBanner"

const meta: Meta<typeof DevelopmentBanner> = {
  component: DevelopmentBanner,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof DevelopmentBanner>

export const Primary: Story = {}
