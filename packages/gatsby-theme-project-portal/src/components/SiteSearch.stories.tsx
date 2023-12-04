import type { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import * as AboutPageStories from "../layouts/AboutPageLayout.stories"
import * as ContactPageStories from "../layouts/ContactPageLayout.stories"
import * as ProjectDetailStories from "../components/ProjectDetail.stories"
import SiteSearch from "./SiteSearch"
import { createSearchIndex } from "../../utils/search"

const meta: Meta<typeof SiteSearch> = {
  component: SiteSearch,
  tags: ["autodocs"],
  includeStories: /^[A-Z]/,
}

type Story = StoryObj<typeof SiteSearch>
export default meta

export const manyProjects = {
  nodes: [
    { ...ProjectDetailStories.LongTitle.args },
    { ...ProjectDetailStories.Minimum.args },
    { ...ProjectDetailStories.NullValues.args },
    { ...ProjectDetailStories.Open.args },
    { ...ProjectDetailStories.Ongoing.args },
    { ...ProjectDetailStories.Completed.args },
    { ...ProjectDetailStories.Maximum.args },
  ],
}

export const oneProject = {
  nodes: [{ ...ProjectDetailStories.LongTitle.args }],
}

export const twoGenPages = {
  nodes: [
    {
      slug: "about",
      ...AboutPageStories.Primary.args.data.generalPage,
    },
    {
      slug: "contact",
      ...ContactPageStories.Primary.args.data.generalPage,
    },
  ],
}

export const oneGeneralPage = {
  nodes: [
    {
      slug: "about",
      ...AboutPageStories.Primary.args.data.generalPage,
    },
  ],
}

export const noPage = {
  nodes: [],
}

// Valid search function
const validSearches = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  const searchInput = canvas.getByLabelText("Search")

  await userEvent.type(searchInput, "about", {
    delay: 500,
  })

  await userEvent.clear(searchInput)

  await userEvent.type(searchInput, "project", {
    delay: 500,
  })
}

// Invalid search function
const invalidSearches = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  const searchInput = canvas.getByLabelText("Search")

  await userEvent.type(searchInput, "%about%", {
    delay: 100,
  })

  await userEvent.clear(searchInput)

  await userEvent.type(searchInput, "😋", {
    delay: 100,
  })

  await userEvent.clear(searchInput)

  await userEvent.type(searchInput, "ひらがな", {
    delay: 100,
  })

  await userEvent.clear(searchInput)

  await userEvent.type(searchInput, "𒐫", {
    delay: 100,
  })

  await userEvent.clear(searchInput)

  await userEvent.type(searchInput, "____", {
    delay: 100,
  })
}

// Many pages
const [indexMany, documentsMany] = createSearchIndex({
  manyProjects,
  twoGenPages,
})
const dbMany = documentsMany.reduce(function (acc, document) {
  acc[document.slug] = document
  return acc
}, {})

export const manyData = {
  siteUrl: "localhost:6006",
  index: indexMany,
  db: dbMany,
}

// One general page, no project pages
const [indexOneGen, documentsOneGen] = createSearchIndex({
  noPage,
  oneGeneralPage,
})
const dbOneGen = documentsOneGen.reduce(function (acc, document) {
  acc[document.slug] = document
  return acc
}, {})

export const oneData = {
  siteUrl: "localhost:6006",
  index: indexOneGen,
  db: dbOneGen,
}

// No general pages, one project page
const [indexOneProj, documentsOneProj] = createSearchIndex({
  oneProject,
  noPage,
})
const dbOneProj = documentsOneProj.reduce(function (acc, document) {
  acc[document.slug] = document
  return acc
}, {})

export const oneProjectData = {
  siteUrl: "localhost:6006",
  index: indexOneProj,
  db: dbOneProj,
}

export const Primary: Story = {
  args: manyData,
}

export const ValidMany: Story = {
  args: manyData,
  play: validSearches,
}

export const InvalidMany: Story = {
  args: manyData,
  play: invalidSearches,
}

export const ValidOneGeneralPage: Story = {
  args: oneData,
  play: validSearches,
}

export const InvalidOneGeneralPage: Story = {
  args: oneData,
  play: invalidSearches,
}

export const ValidOneProjectPage: Story = {
  args: oneProjectData,
  play: validSearches,
}

export const InvalidOneProjectPage: Story = {
  args: oneProjectData,
  play: invalidSearches,
}
