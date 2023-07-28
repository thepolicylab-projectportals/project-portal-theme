import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { ThankYouPageLayout } from "./ThankYouPageLayout"

const meta: Meta<typeof ThankYouPageLayout> = {
  component: ThankYouPageLayout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ThankYouPageLayout>

export const Primary: Story = {
  args: {
    data: {
      page: {
        image: {
          childImageSharp: { resize: { src: "theme-image/contact.jpg" } },
        },
      },
    },
  },
}
