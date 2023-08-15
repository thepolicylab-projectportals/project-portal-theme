import React, { FunctionComponent, ReactNode } from "react"
import { graphql } from "gatsby"
import { Footer, BottomBanner, DevelopmentBanner, Navbar } from "../components"

interface LayoutProps {
  path: string
  title: string
  description: string
  children: ReactNode
  data: { projectPortalConfig: { showDevBanner?: boolean } }
}

export const Layout: FunctionComponent<LayoutProps> = ({
  path,
  data: {
    projectPortalConfig: { showDevBanner },
  },
  children,
}) => {
  return (
    <div className="w-full mx-0 bg-white border-0 xl:container xl:p-0 xl:mx-auto xl:border-l xl:border-r xl:border-gray-200 flex flex-col min-h-screen">
      {showDevBanner && <DevelopmentBanner />}
      <Navbar activePage={path} />
      <div className="flex-1">{children}</div>
      <BottomBanner />
      <Footer />
    </div>
  )
}

export const query = graphql`
  fragment LayoutData on Query {
    projectPortalConfig {
      showDevBanner
    }
  }
`
