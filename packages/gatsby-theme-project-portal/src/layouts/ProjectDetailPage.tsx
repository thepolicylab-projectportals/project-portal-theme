import { Layout } from "./Layout"
import { ProjectDetailLayout, ProjectDetailLayoutProps } from "../components"
import React, { FunctionComponent } from "react"

interface ProjectDetailPageProps extends ProjectDetailLayoutProps {
  slug: string
}

export const ProjectDetailPage: FunctionComponent<ProjectDetailPageProps> = (
  props
) => {
  return (
    <Layout title={props.question} description={props.summary}>
      <ProjectDetailLayout {...props} />
    </Layout>
  )
}
