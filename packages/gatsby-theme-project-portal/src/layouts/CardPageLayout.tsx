import { Layout } from "./Layout"
import { ProjectPage, CardProps } from "../components"
import React, { FunctionComponent } from "react"

export interface CardPageLayoutProps {
  data: {
    allProject: {
      nodes: CardProps[]
    }
    cardPage: {
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
    cardPage: { pageName, title, lede, sortOptions, image },
  },
}) => {
  return (
    <Layout activePage={pageName} title={title} description={lede}>
      <main>
        <ProjectPage
          allProjects={allProject.nodes}
          bgImage={image?.childImageSharp.resize.src}
          title={title}
          lede={lede}
          sortOptions={sortOptions}
        />
      </main>
    </Layout>
  )
}
