import type { Meta, StoryObj } from "@storybook/react"
import { Cards } from "./Cards"
import * as CardStories from "./Card.stories"
import { exampleCards } from "./Card.stories"

const meta: Meta<typeof Cards> = {
  component: Cards,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Cards>

export const Primary: Story = {
  args: {
    nodes: CardStories.exampleCards,
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
