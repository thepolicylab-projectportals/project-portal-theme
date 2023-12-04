import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Layout } from "./Layout"
import * as BottomBannerStories from "../components/BottomBanner.stories"
import * as FooterStories from "../components/Footer.stories"
import * as NavbarStories from "../components/Navbar.stories"

import { bottomBannerLogo } from "../components/BottomBanner.stories"
import { footerLogo } from "../components/Footer.stories"
import { siteTitleLogo } from "../components/Navbar.stories"

const meta: Meta<typeof Layout> = {
  component: Layout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Layout>

export const Primary: Story = {
  args: {
    data: {
      site: {
        siteMetadata: {
          showDevBanner: true,

          staticText: {
            navbar: {
              title: "The Site Title",
              pages: NavbarStories.Primary.args.pages,
            },
            bottomBanner: BottomBannerStories.Primary.args,
            footer: FooterStories.Primary.args,
          },
        },
      },
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

export const Nulls: Story = {
  args: {
    data: {
      site: {
        siteMetadata: {
          showDevBanner: null,
          staticText: {
            navbar: { title: null, pages: [] },
            bottomBanner: { text: null, link: null },
            footer: {
              copyright: null,
              heading: { title: null, link: null },
              links: [],
            },
          },
        },
      },
      navbarLogo: null,
      bottomBannerLogo: null,
      footerLogo: null,
    },
    path: null,
    children: null,
  },
}

export const NoArgs: Story = {}
