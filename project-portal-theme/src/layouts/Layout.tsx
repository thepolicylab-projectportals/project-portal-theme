import React, { FunctionComponent, ReactNode } from "react"
import "@fontsource/public-sans"
import {
  Footer,
  BottomBanner,
  DevelopmentBanner,
  Navbar,
  SiteMetadata,
} from "../components"
import "../styles/style.css"
import useSiteMetadata from "../hooks/useSiteMetadata"

interface LayoutProps {
  activePage?: string
  title: string
  description: string
  children: ReactNode
}

export const Layout: FunctionComponent<LayoutProps> = ({
  activePage,
  title,
  description,
  children,
}) => {

  const meta = useSiteMetadata()

  return (
    <div className="w-full mx-0 bg-white border-0 xl:container xl:p-0 xl:mx-auto xl:border-l xl:border-r xl:border-gray-200 flex flex-col min-h-screen">
      {!meta.live && <DevelopmentBanner />}
      <SiteMetadata title={title} description={description} />
      <Navbar activePage={activePage} />
      <div className="flex-1">{children}</div>
      <BottomBanner />
      <Footer />
    </div>
  )
}
