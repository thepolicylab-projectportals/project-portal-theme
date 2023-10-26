import type { Meta, StoryObj } from "@storybook/react"
import { SearchBar } from "./SearchBar"

const meta: Meta<typeof SearchBar> = {
  component: SearchBar,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof SearchBar>

export const Primary: Story = {
  args: {
    label: "Search here: ",
    id: "filter",
    placeholder: "Type to Search...",
  },
}
