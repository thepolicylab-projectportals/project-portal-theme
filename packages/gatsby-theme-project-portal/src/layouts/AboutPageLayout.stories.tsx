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

export const TailwindXSWindow: Story = {
  args: Primary.args,
  parameters: { viewport: { defaultViewport: "tailwindXS" } },
}

export const TailwindSMWindow: Story = {
  args: Primary.args,
  parameters: { viewport: { defaultViewport: "tailwindSM" } },
}

export const TailwindMDWindow: Story = {
  args: Primary.args,
  parameters: { viewport: { defaultViewport: "tailwindMD" } },
}

export const TailwindLGWindow: Story = {
  args: Primary.args,
  parameters: { viewport: { defaultViewport: "tailwindLG" } },
}

export const TailwindXLWindow: Story = {
  args: Primary.args,
  parameters: { viewport: { defaultViewport: "tailwindXL" } },
}

export const Tailwind2XLWindow: Story = {
  args: Primary.args,
  parameters: { viewport: { defaultViewport: "tailwind2XL" } },
}
