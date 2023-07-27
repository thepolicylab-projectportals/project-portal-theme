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
      CardStories.Open.args,
      CardStories.Ongoing.args,
      CardStories.Completed.args,
      CardStories.OpenNoDate.args,
      CardStories.OngoingNoDate.args,
      CardStories.CompletedNoDate.args,
    ],
  },
}

export const OneCard: Story = {
  args: {
    nodes: [CardStories.Open.args],
  },
}

export const NoCards: Story = {
  args: {
    nodes: [],
  },
}
