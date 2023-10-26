import type { Meta, StoryObj } from "@storybook/react"
import { SiteTitle } from "./SiteTitle"

import { loadImage } from "./Story.utilities"

const meta: Meta<typeof SiteTitle> = {
  component: SiteTitle,
  tags: ["autodocs"],
  includeStories: /^[A-Z]/,
}

export const siteTitleLogo = loadImage("image/logo-square.png", 64, 74, "fixed")

export default meta

type Story = StoryObj<typeof SiteTitle>

export const Primary: Story = {
  args: {
    image: siteTitleLogo,
    title: "The Site Title",
  },
}
