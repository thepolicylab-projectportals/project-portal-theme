import type { Meta, StoryObj } from "@storybook/react"
import { FooterLayout, FooterProps } from "./Footer"

import { emptyGatsbyImageData } from "./Story.utilities"

const meta: Meta<typeof FooterLayout> = {
  component: FooterLayout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof FooterProps>

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
    image: emptyGatsbyImageData,
  },
}

export const NoHeadingLink: Story = {
  args: { ...Primary.args, heading: { title: "Heading Without Link" } },
}

export const NoCopyright: Story = {
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
