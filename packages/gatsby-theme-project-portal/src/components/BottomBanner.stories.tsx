// Ignore checks of unused exported defaults & constants as they are used implicitly by Storybook
// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react"
import { BottomBanner } from "./BottomBanner"
import { loadImage } from "./Story.utilities"

const meta: Meta<typeof BottomBanner> = {
  component: BottomBanner,
  tags: ["autodocs"],
  includeStories: /^[A-Z]/,
}

export const bottomBannerLogo = loadImage(
  "image/ccv-logo.png",
  160,
  83,
  "fixed"
)

export default meta

type Story = StoryObj<typeof BottomBanner>

export const Primary: Story = {
  args: {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    link: "https://ccv.brown.edu",
    linkId: null,
    image: bottomBannerLogo,
  },
}
