import React, { FunctionComponent } from "react"
import { graphql } from "gatsby"
import SiteSearchWrapper from "../components/SiteSearchWrapper"
import { HeaderWithImage } from "../components"
import { ImageDataLike } from "gatsby-plugin-image"

export interface SearchLayoutProps {
  data: {
    site: {
      siteMetadata: {
        siteUrl: string
      }
    }
    generalPage: {
      title: string
      image: ImageDataLike
    }
  }
}

export const SearchPageLayout: FunctionComponent<SearchLayoutProps> = ({
  data: {
    site: {
      siteMetadata: { siteUrl },
    },
    generalPage: { title, image },
  },
}: SearchLayoutProps) => {
  return (
    <>
      <main>
        <header>
          <HeaderWithImage title={title} image={image} lede={""} />
        </header>
        <SiteSearchWrapper siteUrl={siteUrl} />
      </main>
    </>
  )
}

export default SearchPageLayout

export { Head } from "../hooks"
export const query = graphql`
  query SearchQuery($slug: String!) {
    ...HeadData
    ...LayoutData
    page: generalPage(slug: { eq: $slug }) {
      title
      description: lede
    }
    generalPage(slug: { eq: $slug }) {
      pageName
      title
      header
      accessibility
      image {
        ...HeaderWithImageBackground
      }
    }
  }
`
