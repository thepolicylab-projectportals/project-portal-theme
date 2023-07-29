import React, { FunctionComponent } from "react"
import { ProjectPage, CardProps } from "../components"

export interface CardPageLayoutProps {
  data: {
    allProject: {
      nodes: CardProps[]
    }
    page: {
      pageName: string
      title: string
      lede: string
      sortOptions: [...any]
      filter: {
        status: string[]
      }
      image: {
        childImageSharp: {
          resize: {
            src: string
          }
        }
      }
    }
  }
}

export const CardPageLayout: FunctionComponent<CardPageLayoutProps> = ({
  data: {
    allProject,
    page: { pageName, title, lede, sortOptions, image },
  },
}) => {
  return (
    <main>
      <ProjectPage
        allProjects={allProject.nodes}
        bgImage={image?.childImageSharp.resize.src}
        title={title}
        lede={lede}
        sortOptions={sortOptions}
      />
    </main>
  )
}
