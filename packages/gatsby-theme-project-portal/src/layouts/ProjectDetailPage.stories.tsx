import type { Meta, StoryObj } from "@storybook/react"
import { ProjectDetailPage } from "./ProjectDetailPage"
import * as ProjectDetailLayoutStories from "../components/ProjectDetail.stories"
import { emptyGatsbyImageData } from "../components/Story.utilities"

const meta: Meta<typeof ProjectDetailPage> = {
  component: ProjectDetailPage,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ProjectDetailPage>

export const Primary: Story = {
  args: {
    data: {
      project: {
        slug: "the-project",
        ...ProjectDetailLayoutStories.Primary.args,
      },
      projectPortalConfig: {
        projectInterestLink: "https://ccv.brown.edu",
        staticText: {
          mainContactText: {
            ongoingText: "ongoingText",
            completeText: "completeText",
          },
        },
      },
      defaultContactImage: emptyGatsbyImageData,
    },
  },
}
