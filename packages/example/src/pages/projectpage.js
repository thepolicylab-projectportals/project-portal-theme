import React from "react"
import { ProjectPage } from "@hollandjg/gatsby-theme-project-portal/src/components"

const allTopics = [
  { title: "Topic A", slug: "topic-a" },
  { title: "Topic B", slug: "topic-b" },
  { title: "Topic C", slug: "topic-c" },
]

const sample_card = {
  question: "Test Question?",
  slug: "test-project",
  status: "open",
  opportunityCloses: "2022-03-04",
  startDate: "2022-01-03",
  endDate: "2022-03-04",
  agency: "Sample Agency",
  topics: [
    { title: "Topic A", slug: "topic-a" },
    { title: "Topic B", slug: "topic-b" },
  ],
  lastModified: "2022-05-27T16:34:04.000Z",
}

const sample_cards = [
  sample_card,
  {
    ...sample_card,
    slug: "test-project-2",
    status: "ongoing",
    topics: [{ title: "Topic C", slug: "topic-c" }],
  },
  {
    ...sample_card,
    slug: "test-project-3",
    status: "completed",
    topics: [{ title: "Topic B", slug: "topic-b" }],
  },
]

console.log(sample_cards)

const ProjectPageTest = () => {
  return (
    <>
      <ProjectPage
        title={"Example project page"}
        lede={"This is the lede."}
        sortOptions={["created", "opportunityCloses", "startDate", "endDate"]}
        allProjects={sample_cards}
        allTopics={allTopics}
        bgImage={""}
      />
    </>
  )
}

export default ProjectPageTest
