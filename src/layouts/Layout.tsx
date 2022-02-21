import React, { FunctionComponent, ReactNode } from "react"
import "@fontsource/public-sans"
import { Footer, BottomBanner, DevelopmentBanner } from "../components"
import "../styles/style.css"
import meta from "site/meta.json"

interface LayoutProps {
  children: ReactNode
}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full mx-0 bg-white border-0 xl:container xl:p-0 xl:mx-auto xl:border-l xl:border-r xl:border-gray-200 ">
      {!meta.live && <DevelopmentBanner />}
      {children}
      <BottomBanner />
    </div>
  )
}
