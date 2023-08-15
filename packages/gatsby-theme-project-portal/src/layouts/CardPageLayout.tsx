import { ProjectPage, CardProps } from "../components"
import React, { FunctionComponent } from "react"
import { ImageDataLike } from "gatsby-plugin-image"

export interface CardPageLayoutProps {
  data: {
    allProject: {
      nodes: CardProps[]
    }
    cardPage: {
      title: string
      lede: string
      sortOptions: [...any]
      filter: {
        status: string[]
      }
      image: ImageDataLike
    }
  }
}

export const CardPageLayout: FunctionComponent<CardPageLayoutProps> = ({
  data: {
    allProject,
    cardPage: { title, lede, sortOptions, image },
  },
}) => {
  return (
    <>
      <main>
        <ProjectPage
          allProjects={allProject.nodes}
          image={image}
          title={title}
          lede={lede}
          sortOptions={sortOptions}
        />
      </main>
    </>
  )
}
