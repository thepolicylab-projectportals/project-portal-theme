import type { Meta, StoryObj } from "@storybook/react"
import { ThankYouPageLayout } from "./ThankYouPageLayout"
import { loadImage } from "../components/Story.utilities"

const meta: Meta<typeof ThankYouPageLayout> = {
  component: ThankYouPageLayout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ThankYouPageLayout>

export const Primary: Story = {
  args: {
    data: {
      generalPage: {
        image: loadImage("image/background.jpg"),
      },
    },
  },
}
