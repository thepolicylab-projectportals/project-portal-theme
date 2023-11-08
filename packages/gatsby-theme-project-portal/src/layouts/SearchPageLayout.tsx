import React, { FunctionComponent, useEffect, useRef, useState } from "react"
import { graphql } from "gatsby"
import SiteSearchWrapper from "../components/SiteSearchWrapper"

export interface SearchLayoutProps {
  data: {
    site: {
      siteMetadata: {
        siteUrl: string
      }
    }
  }
}

export const SearchPageLayout: FunctionComponent<SearchLayoutProps> = ({
  data: {
    site: {
      siteMetadata: { siteUrl },
    },
  },
}: SearchLayoutProps) => {
  return (
    <>
      <main>
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
