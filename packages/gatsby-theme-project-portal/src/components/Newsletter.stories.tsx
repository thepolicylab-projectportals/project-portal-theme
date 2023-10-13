import type { Meta, StoryObj } from "@storybook/react"
import { Newsletter } from "./Newsletter"

const meta: Meta<typeof Newsletter> = {
  component: Newsletter,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Newsletter>

export const Primary: Story = {
  args: {
    link: "https://ccv.brown.edu",
    text: "Sign up for project portal updates",
  },
}

export const NoText: Story = {
  args: {
    link: "https://ccv.brown.edu",
  },
}

export const TextNoLink: Story = {
  args: {
    text: "Sign up for project portal updates",
  },
}

export const TextEmptyLink: Story = {
  args: {
    link: "",
    text: "Sign up for project portal updates",
  },
}

export const EmptyStrings: Story = {
  args: {
    link: "",
    text: "",
  },
}

export const NoArgs: Story = {
  args: {},
}
