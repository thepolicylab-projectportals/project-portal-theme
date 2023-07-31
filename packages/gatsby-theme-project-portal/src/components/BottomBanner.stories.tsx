import type { Meta, StoryObj } from "@storybook/react"
import { BottomBannerLayout } from "./BottomBanner"

import { IGatsbyImageData } from "gatsby-plugin-image"

const meta: Meta<typeof BottomBannerLayout> = {
  component: BottomBannerLayout,
  tags: ["autodocs"],
  includeStories: /^[A-Z]/,
}

export const bottomBannerLogo: IGatsbyImageData = {
  layout: "fixed",
  images: {
    fallback: {
      src: "image/ccv-logo.png",
    },
    sources: [],
  },
  width: 160,
  height: 83,
}

export default meta

type Story = StoryObj<typeof BottomBannerLayout>

export const Primary: Story = {
  args: {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    link: "https://ccv.brown.edu",
    linkId: null,
    image: bottomBannerLogo,
  },
}
