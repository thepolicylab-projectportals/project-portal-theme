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
    title: "Sign up for project portal updates",
    text: "Subscribe here for monthly updates on new and existing projects on the project portal.",
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

export const TitleNoLink: Story = {
  args: {
    title: "The title",
  },
}

export const TextLinkNoTitle: Story = {
  args: {
    texts: "Sign up for project portal updates",
    link: "https://ccv.brown.edu",
  },
}

export const TitleLinkNoText: Story = {
  args: {
    title: "Sign up for project portal updates",
    link: "https://ccv.brown.edu",
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
