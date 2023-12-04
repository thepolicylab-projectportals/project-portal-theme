import type { Meta, StoryObj } from "@storybook/react"
import { Navbar } from "./Navbar"
import { loadImage } from "./Story.utilities"

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  tags: ["autodocs"],
  includeStories: /^[A-Z]/,
}

export default meta

type Story = StoryObj<typeof Navbar>

export const siteTitleLogo = loadImage("image/logo-square.png", 64, 74, "fixed")

export const Primary: Story = {
  args: {
    title: "The Site Title",
    image: siteTitleLogo,
    activePage: "/",
    pages: [
      { name: "Home", link: "/", show: true },
      { name: "Open", link: "/open/", show: true },
      { name: "Ongoing", link: "/ongoing/", show: true },
      { name: "Completed", link: "/completed/", show: true },
      { name: "Hidden", link: "/hidden/", show: false },
      { name: "Contact", link: "/contact/", show: true },
      { name: "FAQ", link: "/faq/", show: true },
      {
        name: "Mailing List",
        link: "/external/",
        show: true,
        isExternal: true,
      },
    ],
  },
}

export const NoLogo: Story = {
  args: { ...Primary.args, image: null },
}

export const NoLogoXL: Story = {
  args: { ...Primary.args, image: null },
  parameters: { viewport: { defaultViewport: "tailwindXL" } },
}

export const NoTitle: Story = {
  args: { ...Primary.args, title: null },
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

export const EmptyStrings: Story = {
  args: {
    title: "",
    image: siteTitleLogo,
    activePage: "",
    pages: [],
  },
}

export const Nulls: Story = {
  args: {
    title: null,
    image: null,
    activePage: null,
    pages: null,
  },
}

export const NoArgs: Story = {}
