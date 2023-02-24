import { Layout } from "./Layout"
import { ProjectPage, CardProps, TopicType } from "../components"
import React, { FunctionComponent } from "react"

export interface CardPageLayoutProps {
  data: {
    allProject: {
      nodes: CardProps[]
    }
    allTopic: {
      nodes: TopicType[]
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
    allTopic,
    cardPage: { pageName, title, lede, sortOptions, image },
  },
}) => {
  return (
    <Layout activePage={pageName} title={title} description={lede}>
      <main>
        <ProjectPage
          allProjects={allProject.nodes}
          allTopics={allTopic.nodes}
          bgImage={image?.childImageSharp.resize.src}
          title={title}
          lede={lede}
          sortOptions={sortOptions}
        />
      </main>
    </Layout>
  )
}
