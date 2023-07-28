import React, { FunctionComponent, ReactNode } from "react"
import {
  Footer,
  BottomBanner,
  DevelopmentBanner,
  Navbar,
  SiteMetadata,
  NavbarLayout,
} from "../components"
import { useProjectPortalConfig } from "../hooks"
import { graphql } from "gatsby"

interface NewLayoutProps {
  projectPortalConfig: {
    showDevBanner?: boolean
    pages: {
      link: string
      name: string
      show: boolean
    }[]
  }

  activePage?: string
  title: string
  description: string
  children: ReactNode
}

export const NewLayout: FunctionComponent<NewLayoutProps> = ({
  projectPortalConfig: { showDevBanner, pages },
  activePage,
  title,
  description,
  children,
}) => {
  return (
    <div className="w-full mx-0 bg-white border-0 xl:container xl:p-0 xl:mx-auto xl:border-l xl:border-r xl:border-gray-200 flex flex-col min-h-screen">
      {showDevBanner && <DevelopmentBanner />}
      {/*<SiteMetadata title={title} description={description} />*/}
      <NavbarLayout activePage={activePage} title={title} pages={pages} />
      <div className="flex-1">{children}</div>
      {/*<BottomBanner />*/}
      {/*<Footer />*/}
    </div>
  )
}

export const query = graphql`
  fragment LayoutQuery on ProjectPortalConfig {
    showDevBanner
    pages {
      link
      name
      show
    }
  }
`
