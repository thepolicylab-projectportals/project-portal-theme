import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Layout } from "./Layout"
import * as BottomBannerStories from "../components/BottomBanner.stories"
import * as FooterStories from "../components/Footer.stories"
import * as NavbarStories from "../components/Navbar.stories"

import { bottomBannerLogo } from "../components/BottomBanner.stories"
import { footerLogo } from "../components/Footer.stories"
import { siteTitleLogo } from "../components/SiteTitle.stories"

const meta: Meta<typeof Layout> = {
  component: Layout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Layout>

export const Primary: Story = {
  args: {
    data: {
      projectPortalConfig: {
        showDevBanner: true,
        pages: NavbarStories.Primary.args.pages,
        staticText: {
          bottomBanner: BottomBannerStories.Primary.args,
          footer: FooterStories.Primary.args,
        },
      },
      site: { siteMetadata: { title: "The Site Title" } },
      navbarLogo: siteTitleLogo,
      bottomBannerLogo: bottomBannerLogo,
      footerLogo: footerLogo,
    },
    path: "/open/",
    children: <></>,
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
