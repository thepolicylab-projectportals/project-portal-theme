// Ignore checks of unused exported defaults & constants as they are used implicitly by Storybook
// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react"
import { Feature } from "./Feature"

const meta: Meta<typeof Feature> = {
  component: Feature,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Feature>

export const Primary: Story = {
  args: {
    label: "Features",
    className: "",
    value: "thing 1",
  },
}

export const ArrayValue: Story = {
  args: {
    label: "Heading",
    className: "",
    value: ["thing 1", "thing 2"],
  },
}

export const ClassName: Story = {
  args: {
    label: "Some Heading",
    className: "text-red",
    value: ["thing 1", "thing 2"],
  },
}
