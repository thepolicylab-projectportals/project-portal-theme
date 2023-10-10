import { ProjectPage, CardProps } from "../components"
import React, { FunctionComponent } from "react"
import { ImageDataLike } from "gatsby-plugin-image"
import { graphql } from "gatsby"

export { Head } from "../hooks"

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

export default CardPageLayout

export const query = graphql`
  query CardPageQuery($slug: String!, $statusFilter: [String]) {
    ...HeadData
    ...LayoutData
    page: cardPage(slug: { eq: $slug }) {
      title
      description: lede
    }
    cardPage(slug: { eq: $slug }) {
      pageName
      title
      lede
      sortOptions
      image {
        ...HeaderWithImageBackground
      }
    }
    allProject(filter: { status: { in: $statusFilter } }) {
      nodes {
        ...CardDetails
      }
    }
  }
`
