import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { AboutPageLayout } from "./AboutPageLayout"

const meta: Meta<typeof AboutPageLayout> = {
  component: AboutPageLayout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof AboutPageLayout>

export const Primary: Story = {
  args: {
    data: {
      page: {
        pageName: null,
        title: null,
        header: "What we're here to do",
        image: {
          childImageSharp: { resize: { src: "theme-image/contact.jpg" } },
        },
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
