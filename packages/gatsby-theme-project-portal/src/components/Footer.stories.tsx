import type { Meta, StoryObj } from "@storybook/react"
import { Footer } from "./Footer"

import { emptyGatsbyImageData } from "./Story.utilities"

const meta: Meta<typeof Footer> = {
  component: Footer,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Footer>

export const Primary: Story = {
  args: {
    headingTitle: "Heading with Link",
    headingLink: "https://brown.edu/",
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
    altText: "",
  },
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
