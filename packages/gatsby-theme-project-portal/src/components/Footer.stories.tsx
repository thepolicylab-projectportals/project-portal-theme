import type { Meta, StoryObj } from "@storybook/react"
import { FooterLayout } from "./Footer"

import { IGatsbyImageData } from "gatsby-plugin-image"

const meta: Meta<typeof FooterLayout> = {
  component: FooterLayout,
  tags: ["autodocs"],
  includeStories: /^[A-Z]/,
}

export const footerLogo: IGatsbyImageData = {
  layout: "fixed",
  images: {
    fallback: {
      src: "image/logo-wide.png",
    },
    sources: [],
  },
  width: 129,
  height: 64,
}

export default meta

type Story = StoryObj<typeof FooterLayout>

export const Primary: Story = {
  args: {
    heading: {
      title: "Heading with Link",
      link: "https://brown.edu/",
    },
    copyright: "Copyright © 2023",
    links: [
      {
        title: "Link 1",
        link: "https://brown.edu",
      },
      {
        title: "Link 2",
        link: "https://brown.edu",
      },
    ],
    image: { imageData: footerLogo, altText: "Brown Logo" },
  },
}

export const ImageNoHeading: Story = {
  args: { ...Primary.args, heading: { title: "", link: "" } },
}

export const Empty: Story = {
  args: { links: [], heading: { title: "", link: "" }, copyright: "" },
}

export const EmptyCopyright: Story = {
  args: { ...Primary.args, copyright: null },
}

export const NoLinks: Story = {
  args: { ...Primary.args, links: [] },
}

export const ThreeLinks: Story = {
  args: {
    ...Primary.args,
    links: [
      {
        title: "Link 1",
        link: "https://brown.edu",
      },
      {
        title: "Link 2",
        link: "https://brown.edu",
      },
      {
        title: "Link 3",
        link: "https://brown.edu",
      },
    ],
  },
}
