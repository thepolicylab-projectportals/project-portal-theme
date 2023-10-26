// Ignore checks of unused exported defaults & constants as they are used implicitly by Storybook
// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react"
import { Footer } from "./Footer"

import { IGatsbyImageData } from "gatsby-plugin-image"
import { loadImage } from "./Story.utilities"

const meta: Meta<typeof Footer> = {
  component: Footer,
  tags: ["autodocs"],
  includeStories: /^[A-Z]/,
}

export const footerLogo: IGatsbyImageData = loadImage(
  "image/logo-wide.png",
  129,
  64,
  "fixed"
)

export default meta

type Story = StoryObj<typeof Footer>

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
