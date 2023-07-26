import type { Meta, StoryObj } from "@storybook/react"
import { MainContact } from "./MainContact"
import { emptyGatsbyImageData } from "./Story.utilities"

const meta: Meta<typeof MainContact> = {
  component: MainContact,
  tags: ["autodocs"],
  args: {
    image: emptyGatsbyImageData,
  },
}

export default meta

type Story = StoryObj<typeof MainContact>

// TODO: Doesn't work becuase MainContact uses useStaticText
export const Primary: {
  args: {
    name: "Contact Name"
    title: "Title"
    employer: "Employer"
    email: "some-email@example.com"
    status: "open"
    emailContent: "Are you interested in this project?"
  }
}
