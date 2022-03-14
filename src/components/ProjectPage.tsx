import React from "react"
import { Cards, CardProps } from "../components"
import { Layout } from "../layouts/Layout"
import { HeaderWithImage } from "./HeaderWithImage"
import { Pagination } from "./Pagination"

export interface ProjectPageProps {
  currentPage: number
  numPages: number
  title: string
  lede: string
  pageName: string
  status: string
  data: {
    items: {
      nodes: {
        data: CardProps
      }[]
    }
    bgImage: {
      childImageSharp: {
        resize: {
          src: string
        }
      }
    }
  }
}

export const ProjectPage = ({
  currentPage,
  numPages,
  title,
  data,
  lede,
  pageName,
  status,
}: ProjectPageProps) => {
  return (
    <Layout activePage={pageName} title={title} description={lede}>
      <HeaderWithImage
        title={title}
        imageSrc={data.bgImage.childImageSharp.resize.src}
        lede={lede}
      />
      <Cards nodes={data.items.nodes} />
      <Pagination
        currentPage={currentPage}
        numPages={numPages}
        status={status}
      />
    </Layout>
  )
}
