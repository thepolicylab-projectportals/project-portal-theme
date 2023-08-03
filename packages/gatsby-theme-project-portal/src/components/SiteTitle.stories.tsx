import type { Meta, StoryObj } from "@storybook/react"
import { SiteTitle } from "./SiteTitle"

import { emptyGatsbyImageData } from "./Story.utilities"

const meta: Meta<typeof SiteTitle> = {
  component: SiteTitle,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof SiteTitle>

export const Primary: Story = {
  args: {
    image: emptyGatsbyImageData,
    title: "The Site Title",
  },
}
