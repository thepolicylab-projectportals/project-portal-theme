import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { AboutPageLayout } from "./AboutPageLayout"

const meta: Meta<typeof AboutPageAboutPageLayout> = {
  component: AboutPageLayout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof AboutPageLayout>

// TODO: Fix this – relies on SiteMetadata, which uses a static query.
export const Primary: Story = {
  args: {},
}
