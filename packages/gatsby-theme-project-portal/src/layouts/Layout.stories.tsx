import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Layout } from "./Layout"
import * as NavbarStories from "../components/Navbar.stories"
import * as BottomBannerStories from "../components/BottomBanner.stories"
import * as FooterStories from "../components/Footer.stories"

const meta: Meta<typeof Layout> = {
  component: Layout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Layout>

export const Primary: Story = {
  args: {
    path: "/",
    data: {
      site: {
        siteMetadata: { title: "Site Title" },
      },
      projectPortalConfig: {
        showDevBanner: true,
        pages: NavbarStories.Primary.args.pages,
        staticText: {
          bottomBanner: BottomBannerStories.Primary.args,
          footer: FooterStories.Primary.args,
        },
      },
    },
    children: <></>,
  },
}
