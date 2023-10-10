import type { Meta, StoryObj } from "@storybook/react"
import { MainContact } from "./MainContact"
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
    projectInterestLink: "https://ccv.brown.edu/",
    status: "open",
    image: contactImage,
    defaultImage: contactImageYogi,
    openText: "Open project – get involved.",
    ongoingText: "Ongoing project – watch us do something awesome.",
    completeText: "Completed project – look at what we did!",
  },
}

export const Open: Story = {
  args: { ...Primary.args, status: "open" },
}

export const Ongoing: Story = {
  args: { ...Primary.args, status: "ongoing" },
}

export const Completed: Story = {
  args: { ...Primary.args, status: "completed" },
}
