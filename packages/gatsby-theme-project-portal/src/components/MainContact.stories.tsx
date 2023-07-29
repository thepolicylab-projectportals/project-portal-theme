import type { Meta, StoryObj } from "@storybook/react"
import { MainContact } from "./MainContact"
import { emptyGatsbyImageData } from "./Story.utilities"
import { contactImage, contactImageYogi } from "./Contact.stories"

const meta: Meta<typeof MainContact> = {
  component: MainContact,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof MainContact>

export const Primary: Story = {
  args: {
    name: "Contact Name",
    title: "Title",
    employer: "Employer",
    email: "some-email@example.com",
    status: "open",
    mainText: "We are actively searching for collaborators.",
    image: contactImage,
    defaultContactImage: contactImageYogi,
  },
}

export const ProjectInterestLink: Story = {
  args: {
    ...Primary.args,
    projectInterestLink: "https://ccv.brown.edu",
  },
}

export const NoImage: Story = {
  args: {
    ...Primary.args,
    image: null,
  },
}
