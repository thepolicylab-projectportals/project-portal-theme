import { Layout } from "./Layout"
import { ProjectDetailLayout, ProjectDetailLayoutProps } from "../components"
import React, { FunctionComponent } from "react"

interface ProjectDetailPageProps extends ProjectDetailLayoutProps {
  slug: string
}
interface ProjectDetailPageQueryResults {
  data: {
    project: ProjectDetailPageProps
  }
}

export const ProjectDetailPage: FunctionComponent<
  ProjectDetailPageQueryResults
> = (props) => {
  console.log("ProjectDetailPage props passed: ", props)
  const {
    data: { project },
  } = props
  console.log("ProjectDetailPage project passed: ", project)
  return (
    <Layout title={project.question} description={project.summary}>
      <ProjectDetailLayout {...project} />
    </Layout>
  )
}
