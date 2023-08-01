import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { ContactPageLayout } from "./ContactPageLayout"

const meta: Meta<typeof ContactPageLayout> = {
  component: ContactPageLayout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ContactPageLayout>

// TODO: Fix this – relies on SiteMetadata, which uses a static query.
export const Primary: Story = {
  args: {},
}
