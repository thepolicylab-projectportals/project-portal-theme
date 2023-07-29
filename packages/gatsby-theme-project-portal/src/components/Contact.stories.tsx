import type { Meta, StoryObj } from "@storybook/react"
import { Contact } from "./Contact"
import { emptyGatsbyImageData } from "./Story.utilities"
import { IGatsbyImageData } from "gatsby-plugin-image"

const meta: Meta<typeof Contact> = {
  component: Contact,
  tags: ["autodocs"],
  includeStories: /^[A-Z]/,
}

export default meta

type Story = StoryObj<typeof Contact>

export const contactImage: IGatsbyImageData = {
  layout: "fixed",
  images: {
    fallback: {
      src: "image/torso.png",
    },
    sources: [],
  },
  width: 100,
  height: 100,
}

export const contactImageYogi: IGatsbyImageData = {
  layout: "fixed",
  images: {
    fallback: {
      src: "image/yogi.jpg",
    },
    sources: [],
  },
  width: 100,
  height: 100,
}

export const Primary: Story = {
  args: {
    name: "Contact Name",
    title: "Title",
    employer: "Employer",
    email: "some-email@example.com",
    showEmail: true,
    image: contactImage,
  },
}

export const NoEmail: Story = {
  args: { ...Primary.args, showEmail: false },
}

export const NoImage: Story = {
  args: { ...Primary.args, image: null },
}
