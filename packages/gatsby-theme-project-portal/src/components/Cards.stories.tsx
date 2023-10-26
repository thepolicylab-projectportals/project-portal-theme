// Ignore checks of unused exported defaults & constants as they are used implicitly by Storybook
// noinspection JSUnusedGlobalSymbols

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

export const TailwindXSWindow: Story = {
  args: Primary.args,
  parameters: { viewport: { defaultViewport: "tailwindXS" } },
}

export const TailwindSMWindow: Story = {
  args: Primary.args,
  parameters: { viewport: { defaultViewport: "tailwindSM" } },
}

export const TailwindMDWindow: Story = {
  args: Primary.args,
  parameters: { viewport: { defaultViewport: "tailwindMD" } },
}

export const TailwindLGWindow: Story = {
  args: Primary.args,
  parameters: { viewport: { defaultViewport: "tailwindLG" } },
}

export const TailwindXLWindow: Story = {
  args: Primary.args,
  parameters: { viewport: { defaultViewport: "tailwindXL" } },
}

export const Tailwind2XLWindow: Story = {
  args: Primary.args,
  parameters: { viewport: { defaultViewport: "tailwind2XL" } },
}
