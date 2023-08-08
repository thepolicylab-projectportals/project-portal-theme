import type { Meta, StoryObj } from "@storybook/react"
import { Cards } from "./Cards"
import * as CardStories from "./Card.stories"

const meta: Meta<typeof Cards> = {
  component: Cards,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Cards>

export const Primary: Story = {
  args: {
    nodes: [
      CardStories.longTitleData,
      CardStories.openData,
      CardStories.ongoingData,
      CardStories.completedData,
      CardStories.openNoDateData,
      CardStories.ongoingNoDateData,
      CardStories.completedNoDateData,
      CardStories.longTopicsListData,
    ],
  },
}

export const OneCard: Story = {
  args: {
    nodes: [CardStories.openData],
  },
}

export const NoCards: Story = {
  args: {
    nodes: [],
  },
}
