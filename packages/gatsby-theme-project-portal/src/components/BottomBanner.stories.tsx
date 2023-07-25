import type { Meta, StoryObj } from "@storybook/react"
import { BottomBannerLayout } from "./BottomBanner"
import { emptyGatsbyImageData } from "./Contact.stories"

const meta: Meta<typeof BottomBannerLayout> = {
  component: BottomBannerLayout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof BottomBannerLayout>

export const Primary: Story = {
  args: {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    link: "https://ccv.brown.edu",
    linkId: null,
    image: emptyGatsbyImageData,
  },
}
