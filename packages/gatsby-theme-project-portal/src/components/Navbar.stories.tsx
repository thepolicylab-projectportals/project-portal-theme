import type { Meta, StoryObj } from "@storybook/react"
import { Navbar } from "./Navbar"
import * as SiteTitleStories from "./SiteTitle.stories"

import { emptyGatsbyImageData } from "./Story.utilities"

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  tags: ["autodocs"],
  includeStories: /^[A-Z]/,
}

export default meta

type Story = StoryObj<typeof Navbar>

export const examplePages = [
  { name: "Home", link: "/", show: true },
  { name: "Open", link: "/open", show: true },
  { name: "Ongoing", link: "/ongoing", show: true },
  { name: "Completed", link: "/completed", show: true },
  { name: "Hidden", link: "/hidden", show: false },
  { name: "Contact", link: "/contact", show: true },
  { name: "FAQ", link: "/faq", show: true },
]
export const Primary: Story = {
  args: {
    ...SiteTitleStories.Primary.args,
    activePage: "Home",
    pages: examplePages,
  },
}

export const OpenPageIsActive: Story = {
  args: { ...Primary.args, activePage: "Open" },
}
