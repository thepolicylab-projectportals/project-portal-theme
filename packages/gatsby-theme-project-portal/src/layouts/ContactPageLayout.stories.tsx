import type { Meta, StoryObj } from "@storybook/react"
import { ContactPageLayout } from "./ContactPageLayout"
import { loadImage } from "../components/Story.utilities"

const meta: Meta<typeof ContactPageLayout> = {
  component: ContactPageLayout,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ContactPageLayout>

export const Primary: Story = {
  args: {
    pageContext: {
      thankYouPagePath: "/contact/thank-you/",
    },
    data: {
      generalPage: {
        title: "Want to talk to the Policy Lab? We'd love to hear from you!",
        lede:
          "Our team is happy to answer questions about the partnerships pilot," +
          " project-specific questions, general questions about working with the Project" +
          " Portal, and ideas for how we can improve this site.",
        image: loadImage("image/background.jpg"),
      },
      projectPortalConfig: {
        recaptchaSiteKey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
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
