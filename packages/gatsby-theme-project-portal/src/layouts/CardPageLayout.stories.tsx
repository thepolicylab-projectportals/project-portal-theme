import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { CardPageLayout } from "./CardPageLayout"
import { exampleCards } from "../components/Card.stories"

const meta: Meta<typeof CardPageLayout> = {
  component: CardPageLayout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof CardPageLayout>

export const Primary: Story = {
  args: {
    data: {
      page: {
        pageName: "Open Opportunities",
        title: "Open Opportunities",
        lede:
          "The Project Portal is designed to help share knowledge about governmental" +
          " research projects.",
        sortOptions: ["created", "opportunityCloses"],
        image: {
          childImageSharp: {
            resize: {
              src: "theme-image/contact.jpg",
            },
          },
        },
        filter: { status: [] },
      },
      allProject: {
        nodes: exampleCards,
      },
    },
  },
}
