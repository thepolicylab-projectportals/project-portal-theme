import type { Meta, StoryObj } from "@storybook/react"
import { NavbarItem } from "./NavbarItem"

const meta: Meta<typeof NavbarItem> = {
  component: NavbarItem,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "green",
      values: [
        { name: "black", value: "#000" },
        { name: "teal", value: "#00e0e3" },
        { name: "green", value: "#186d00" },
      ],
    },
  },
}

export default meta

type Story = StoryObj<typeof NavbarItem>

export const Active: Story = {
  args: {
    name: "Home",
    link: "/",
    isActive: true,
  },
}

export const Inactive: Story = {
  args: {
    ...Active.args,
    isActive: false,
  },
}
