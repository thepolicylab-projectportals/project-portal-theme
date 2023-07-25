import type { Meta, StoryObj } from "@storybook/react"
import {
  CollaboratorDetails,
  CollaboratorDetailsProps,
} from "./CollaboratorDetails"

const meta: Meta<typeof CollaboratorDetails> = {
  component: CollaboratorDetails,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof CollaboratorDetailsProps>

export const Primary: Story = {
  args: {
    expertise: "- Collaborator.\n- Details.\n- Expertise.\n",
    requirement: "Must be a collaborator\n",
    keyDates:
      "We are ready to begin the project as soon as we identify a collaborator.\n",
  },
}
