import type { Meta, StoryObj } from "@storybook/react"
import { ThankYouPageLayout } from "./ThankYouPageLayout"
import { loadImage } from "../components/Story.utilities"

const meta: Meta<typeof ThankYouPageLayout> = {
  component: ThankYouPageLayout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ThankYouPageLayout>

export const Primary: Story = {
  args: {
    data: {
      generalPage: {
        image: loadImage("image/background.jpg"),
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
