import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Layout } from "./Layout"

const meta: Meta<typeof Layout> = {
  component: Layout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Layout>

// TODO: Fix this – relies on SiteMetadata, which uses a static query.
export const Primary: Story = {
  args: {
    activePage: "open",
    title: "Page Title",
    description: "The page description (metadata)",
    children: <></>,
    showDevBanner: false,
  },
}
