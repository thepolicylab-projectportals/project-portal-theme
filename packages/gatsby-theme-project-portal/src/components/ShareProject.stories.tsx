import type { Meta, StoryObj } from "@storybook/react"
import { ShareProject } from "./ShareProject"

const meta: Meta<typeof ShareProject> = {
  component: ShareProject,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "green",
      values: [
        { name: "black", value: "#000" },
        { name: "teal", value: "#00e0e3" },
        { name: "green", value: "#186d00" },
      ],
    },
  },
}

export default meta

type Story = StoryObj<typeof ShareProject>

export const Primary: Story = {}

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
