import React from "react"
import { Cards, CardProps } from "../components"
import { Layout } from "../layouts/Layout"
import { HeaderWithImage } from "./HeaderWithImage"

export interface ProjectPageProps {
  title: string
  lede: string
  pageName: string
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
  title,
  data,
  lede,
  pageName,
}: ProjectPageProps) => {
  return (
    <Layout activePage={pageName} title={title} description={lede}>
      <HeaderWithImage
        title={title}
        imageSrc={data.bgImage.childImageSharp.resize.src}
        lede={lede}
      />

      <Cards nodes={data.items.nodes} />
    </Layout>
  )
}
