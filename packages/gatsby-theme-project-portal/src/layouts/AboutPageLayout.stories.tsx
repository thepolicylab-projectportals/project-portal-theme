import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { AboutPageLayout } from "./AboutPageLayout"
import { loadImage } from "../components/Story.utilities"

const meta: Meta<typeof AboutPageLayout> = {
  component: AboutPageLayout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof AboutPageLayout>

export const Primary: Story = {
  args: {
    data: {
      generalPage: {
        pageName: null,
        title: null,
        header: "What we're here to do",
        image: loadImage("image/background.jpg"),
        aims: [
          {
            title: "About Aim",
            text: "Some text",
          },
        ],
        faq: [
          {
            title: "Is this an FAQ question?",
            text: "Yes, and here is the answer.",
          },
        ],
        accessibility:
          "We are committed to making the Project Portal accessible for all.",
      },
    },
  },
}
