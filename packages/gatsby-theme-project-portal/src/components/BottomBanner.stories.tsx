import type { Meta, StoryObj } from "@storybook/react"
import { BottomBanner } from "./BottomBanner"

import { emptyGatsbyImageData } from "./Story.utilities"

const meta: Meta<typeof BottomBanner> = {
  component: BottomBanner,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof BottomBanner>

export const Primary: Story = {
  args: {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    link: "https://ccv.brown.edu",
    linkId: null,
    image: emptyGatsbyImageData,
  },
}
