import type { Meta, StoryObj } from "@storybook/react"
import { CardPageLayout } from "./CardPageLayout"
import { exampleCards } from "../components/Cards.stories"
import { loadImage } from "../components/Story.utilities"

const meta: Meta<typeof CardPageLayout> = {
  component: CardPageLayout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof CardPageLayout>

export const Primary: Story = {
  args: {
    data: {
      cardPage: {
        pageName: "All Projects",
        title: "All Projects",
        lede:
          "The Project Portal is designed to help share knowledge about governmental" +
          " research projects.",
        sortOptions: [
          "created",
          "opportunityCloses",
          "s" + "tartDate",
          "endDate",
        ],
        image: loadImage("image/background.jpg"),
        filter: { status: [] },
      },
      allProject: {
        nodes: [...exampleCards, ...exampleCards],
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
