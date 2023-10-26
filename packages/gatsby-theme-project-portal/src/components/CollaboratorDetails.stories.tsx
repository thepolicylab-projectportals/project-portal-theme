// Ignore checks of unused exported defaults & constants as they are used implicitly by Storybook
// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react"
import { CollaboratorDetails } from "./CollaboratorDetails"

const meta: Meta<typeof CollaboratorDetails> = {
  component: CollaboratorDetails,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof CollaboratorDetails>

export const Primary: Story = {
  args: {
    expertise: "- Collaborator.\n- Details.\n- Expertise.\n",
    requirement: "Must be a collaborator\n",
    keyDates:
      "We are ready to begin the project as soon as we identify a collaborator.\n",
  },
}

export const Empty: Story = {
  args: {},
}

export const NoExpertise: Story = {
  args: { ...Primary.args, expertise: null },
}

export const NoRequirements: Story = {
  args: { ...Primary.args, requirement: null },
}

export const NoKeyDates: Story = {
  args: { ...Primary.args, keyDates: null },
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
