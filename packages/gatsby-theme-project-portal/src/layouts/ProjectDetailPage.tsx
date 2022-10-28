import { Layout } from "./Layout"
import { ProjectDetailLayout, ProjectDetailLayoutProps } from "../components"
import React, { FunctionComponent } from "react"

// For the ProjectDetailPage we add the slug which isn't on the layout
interface ProjectDetailPageProps extends ProjectDetailLayoutProps {
  slug: string
}

// The query results we're interested in are hidden inside the data.project field in the query object
interface ProjectDetailPageQueryResults {
  data: {
    project: ProjectDetailPageProps
  }
}

export const ProjectDetailPage: FunctionComponent<
  ProjectDetailPageQueryResults
> = (props) => {
  // Destructure the results of the query to get the props we need from the project
  const {
    data: { project },
  } = props

  return (
    <Layout title={project.question} description={project.summary}>
      <main>
        <ProjectDetailLayout {...project} />
      </main>
    </Layout>
  )
}
