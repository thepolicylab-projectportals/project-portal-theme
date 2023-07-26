import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { ProjectDetailPage } from "./ProjectDetailPage"

const meta: Meta<typeof ProjectDetailPage> = {
  component: ProjectDetailPage,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ProjectDetailPage>

// TODO: Fix this – relies on SiteMetadata, which uses a static query.
export const Primary: Story = {
  args: {},
}
