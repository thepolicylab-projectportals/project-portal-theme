import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { NewLayout } from "./NewLayout"

const meta: Meta<typeof NewLayout> = {
  component: NewLayout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof NewLayout>

export const Primary: Story = {
  args: {
    projectPortalConfig: { showDevBanner: true },
    activePage: "open",
    title: "Page Title",
    description: "The page description (metadata)",
    children: <></>,
  },
}
