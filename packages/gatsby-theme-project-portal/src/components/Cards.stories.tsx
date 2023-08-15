import type { Meta, StoryObj } from "@storybook/react"
import { Cards } from "./Cards"
import * as CardStories from "./Card.stories"

const meta: Meta<typeof Cards> = {
  component: Cards,
  tags: ["autodocs"],
  includeStories: /^[A-Z]/,
}

export default meta

type Story = StoryObj<typeof Cards>

export const exampleCards = [
  CardStories.openData,
  CardStories.ongoingData,
  CardStories.completedData,
  CardStories.openNoDateData,
  CardStories.ongoingNoDateData,
  CardStories.completedNoDateData,
  CardStories.longTopicsListData,  
]

export const Primary: Story = {
  args: {
    nodes: exampleCards,
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
