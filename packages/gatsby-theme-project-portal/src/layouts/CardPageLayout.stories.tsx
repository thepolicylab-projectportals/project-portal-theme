import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { CardPageLayout } from "./CardPageLayout"
import { exampleCards } from "../components/Cards.stories"

const meta: Meta<typeof CardPageLayout> = {
  component: CardPageLayout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof CardPageLayout>

export const Primary: Story = {
  args: {
    data: {
      cardPage: {
        pageName: "All Projects",
        title: "All Projects",
        lede:
          "The Project Portal is designed to help share knowledge about governmental" +
          " research projects.",
        sortOptions: ["created", "opportunityCloses", "startDate", "endDate"],
        image: {
          childImageSharp: {
            resize: {
              src: "image/background.jpg",
            },
          },
        },
        filter: { status: [] },
      },
      allProject: {
        nodes: [...exampleCards, ...exampleCards],
      },
    },
  },
}
