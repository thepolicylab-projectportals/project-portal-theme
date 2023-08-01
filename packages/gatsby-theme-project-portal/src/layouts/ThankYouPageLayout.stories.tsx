import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { ThankYouPageLayout } from "./ThankYouPageLayout"

const meta: Meta<typeof ThankYouPageLayout> = {
  component: ThankYouPageLayout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ThankYouPageLayout>

// TODO: Fix this – relies on SiteMetadata, which uses a static query.
export const Primary: Story = {
  args: {},
}
