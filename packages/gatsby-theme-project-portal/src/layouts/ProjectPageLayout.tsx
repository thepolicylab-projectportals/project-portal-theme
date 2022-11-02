import { Layout } from "./Layout"
import { ProjectPage, CardProps } from "../components"
import React, { FunctionComponent } from "react"

export interface ProjectPageLayoutProps {
  allProject: {
    nodes: CardProps[]
  }
  bgImage: {
    childImageSharp: {
      resize: {
        src: string
      }
    }
  }
  pageName: string
  title: string
  lede: string
  sortOptions: [...any]
}

export const ProjectPageLayout: FunctionComponent<ProjectPageLayoutProps> = ({
  allProject,
  bgImage,
  pageName,
  title,
  lede,
  sortOptions,
}) => {
  return (
    <Layout activePage={pageName} title={title} description={lede}>
      <main>
        <ProjectPage
          allProjects={allProject.nodes}
          bgImage={bgImage?.childImageSharp.resize.src}
          title={title}
          lede={lede}
          sortOptions={sortOptions}
        />
      </main>
    </Layout>
  )
}
