import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { CardPageLayout } from "./CardPageLayout"

const meta: Meta<typeof CardPageLayout> = {
  component: CardPageLayout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof CardPageLayout>

// TODO: Fix this – relies on SiteMetadata, which uses a static query.
export const Primary: Story = {
  args: {},
}
