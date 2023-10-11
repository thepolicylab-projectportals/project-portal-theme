import React, { FunctionComponent, ReactNode } from "react"
import { DevelopmentBanner } from "./DevelopmentBanner"
import { Navbar, NavbarProps } from "./Navbar"
import { BottomBanner, BottomBannerProps } from "./BottomBanner"
import { Footer, FooterProps } from "./Footer"

export interface PageLayoutProps {
  children: ReactNode
  devBanner?: { show?: boolean }
  navbar?: NavbarProps
  bottomBanner?: BottomBannerProps
  footer?: FooterProps
}

export const PageLayout: FunctionComponent<PageLayoutProps> = ({
  children,
  devBanner,
  navbar,
  bottomBanner,
  footer,
}) => {
  return (
    <div className="w-full mx-0 bg-white border-0 xl:container xl:p-0 xl:mx-auto xl:border-l xl:border-r xl:border-gray-200 flex flex-col min-h-screen">
      {devBanner?.show && <DevelopmentBanner />}
      <Navbar {...navbar} />
      <div className="flex-1">{children}</div>
      <BottomBanner {...bottomBanner} />
      <Footer {...footer} />
    </div>
  )
}
