import React from "react"
import {
  Cards,
  CardProps,
  Navbar,
  SiteMetadata,
  BottomBanner,
} from "../components"
import { Layout } from "../layouts/Layout"
import { HeaderWithImage } from "./HeaderWithImage"

export interface ProjectPageProps {
  title: string
  lede: string
  pageName: string
  footerTitle: string
  footerText: string
  footerButton: string
  footerLink: string
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
  footerTitle,
  footerText,
  footerButton,
  footerLink,
}: ProjectPageProps) => {
  return (
    <Layout>
      <SiteMetadata
        title="Project Portal"
        description="Questions from East Evidencia."
      />

      <Navbar activePage={pageName} />

      <HeaderWithImage
        title={title}
        imageSrc={data.bgImage.childImageSharp.resize.src}
        lede={lede}
      />

      <Cards nodes={data.items.nodes} />

      <BottomBanner
        title={footerTitle}
        text={footerText}
        link={footerLink}
        buttonText={footerButton}
      />
    </Layout>
  )
}
