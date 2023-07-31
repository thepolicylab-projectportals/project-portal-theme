import type { Meta, StoryObj } from "@storybook/react"
import { SiteTitle } from "./SiteTitle"

import { emptyGatsbyImageData } from "./Story.utilities"
import { IGatsbyImageData } from "gatsby-plugin-image"

const meta: Meta<typeof SiteTitle> = {
  component: SiteTitle,
  tags: ["autodocs"],
  includeStories: /^[A-Z]/,
}

export const siteTitleLogo: IGatsbyImageData = {
  layout: "fixed",
  images: {
    fallback: {
      src: "image/logo-square.png",
    },
    sources: [],
  },
  width: 64,
  height: 74,
}

export default meta

type Story = StoryObj<typeof SiteTitle>

export const Primary: Story = {
  args: {
    image: siteTitleLogo,
    title: "The Site Title",
  },
}
