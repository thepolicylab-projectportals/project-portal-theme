import type { Meta, StoryObj } from "@storybook/react"
import { PageLayoutNested } from "./PageLayoutNested"
import * as bottomBannerStories from "../components/BottomBanner.stories"
import * as footerStories from "../components/Footer.stories"
import * as navbarStories from "../components/Navbar.stories"

const meta: Meta<typeof PageLayoutNested> = {
  component: PageLayoutNested,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof PageLayoutNested>

export const Primary: Story = {
  args: {
    devBanner: { show: true },
    navbar: navbarStories.Primary.args,
    bottomBanner: bottomBannerStories.Primary.args,
    footer: footerStories.Primary.args,
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

export const Nulls: Story = {
  args: {
    devBanner: { show: true },
    navbar: navbarStories.Nulls.args,
    bottomBanner: bottomBannerStories.Nulls.args,
    footer: footerStories.Nulls.args,
  },
}

export const NoArgs: Story = {}
