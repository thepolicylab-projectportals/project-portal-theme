import React, { FunctionComponent, ReactNode } from "react"
import {
  Footer,
  BottomBanner,
  DevelopmentBanner,
  Navbar,
  SiteMetadata, SignUpForm,
} from "../components"
import { useProjectPortalConfig } from "../hooks"

interface LayoutProps {
  activePage?: string
  title: string
  description: string
  children: ReactNode
  showDevBanner?: boolean
}

function getShowDevBannerSetting(showDevBanner?: boolean) {
  // Checks whether the "showDevBanner" argument is explicitly set and use it if it is (i.e. not null),
  // else use the showDevBannerThemeSetting.
  const { showDevBanner: showDevBannerThemeSetting } = useProjectPortalConfig()
  return showDevBanner ?? showDevBannerThemeSetting
}

export const Layout: FunctionComponent<LayoutProps> = ({
  activePage,
  title,
  description,
  showDevBanner,
  children,
}) => {
  const coalescedShowDevBanner = getShowDevBannerSetting(showDevBanner)

  return (
    <div className="w-full mx-0 bg-white border-0 xl:container xl:p-0 xl:mx-auto xl:border-l xl:border-r xl:border-gray-200 flex flex-col min-h-screen">
      {coalescedShowDevBanner && <DevelopmentBanner />}
      <SiteMetadata title={title} description={description} />
      <Navbar activePage={activePage} />
      <div className="flex-1">{children}</div>
      <BottomBanner />
        <div className="flex items-center justify-center p-5">
            <SignUpForm/>
        </div>
      <Footer />
    </div>
  )
}
