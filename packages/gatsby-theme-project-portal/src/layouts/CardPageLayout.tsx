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
    bgImage: {
      childImageSharp: {
        resize: {
          src: string
        }
      }
    }
    cardPage: {
      pageName: string
      title: string
      lede: string
      sortOptions: [...any]
      filter: {
        status: string[]
      }
    }
  }
}

export const CardPageLayout: FunctionComponent<CardPageLayoutProps> = ({
  data: {
    allProject,
    allTopic,
    bgImage,
    cardPage: { pageName, title, lede, sortOptions },
  },
}) => {
  return (
    <Layout activePage={pageName} title={title} description={lede}>
      <main>
        <ProjectPage
          allProjects={allProject.nodes}
          allTopics={allTopic.nodes}
          bgImage={bgImage?.childImageSharp.resize.src}
          title={title}
          lede={lede}
          sortOptions={sortOptions}
        />
      </main>
    </Layout>
  )
}
