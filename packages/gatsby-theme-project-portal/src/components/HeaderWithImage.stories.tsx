import type { Meta, StoryObj } from "@storybook/react"
import { HeaderWithImage } from "./HeaderWithImage"

const meta: Meta<typeof HeaderWithImage> = {
  component: HeaderWithImage,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof HeaderWithImage>

export const Primary: Story = {
  args: {
    title: "The Title",
    lede:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" +
      " incididunt ut labore et dolore magna aliqua. ",
    imageSrc: "image/background.jpg",
  },
}
