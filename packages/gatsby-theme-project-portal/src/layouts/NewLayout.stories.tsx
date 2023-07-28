import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { NewLayout } from "./NewLayout"
import { examplePages } from "../components/Navbar.stories"
import * as BottomBannerStories from "../components/BottomBanner.stories"
import * as FooterStories from "../components/Footer.stories"

const meta: Meta<typeof NewLayout> = {
  component: NewLayout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof NewLayout>

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
    },
    activePage: "Open",
    title: "Page Title",
    description: "The page description (metadata)",
    children: <></>,
  },
}
