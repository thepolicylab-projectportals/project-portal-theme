import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Layout } from "./Layout"
import { examplePages, navbarLogo } from "../components/Navbar.stories"
import * as BottomBannerStories from "../components/BottomBanner.stories"
import * as FooterStories from "../components/Footer.stories"
import { bottomBannerLogo } from "../components/BottomBanner.stories"
import { footerLogo } from "../components/Footer.stories"

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
        pages: examplePages,
        staticText: {
          bottom_banner: BottomBannerStories.Primary.args,
          footer: FooterStories.Primary.args,
        },
      },
      site: { siteMetadata: { title: "The Site Title" } },
      navbarLogo: navbarLogo,
      bottomBannerLogo: bottomBannerLogo,
      footerLogo: footerLogo,
    },
    path: "/open/",
    children: <></>,
  },
}
