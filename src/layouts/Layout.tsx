import React, { FunctionComponent, ReactNode } from "react"
import "@fontsource/public-sans"
import { Footer, BottomBanner } from "../components"
import "../styles/style.css"

interface LayoutProps {
  children: ReactNode
}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full mx-0 bg-white border-0 xl:container xl:p-0 xl:mx-auto xl:border-l xl:border-r xl:border-gray-200 ">
      {children}
      <BottomBanner
        text={
          "This portal is part of a pilot initiative to support applied research partnerships. If you have ideas for how to further improve it, please "
        }
        link={"mailto:thepolicylab@brown.edu"}
      />
      <Footer />
    </div>
  )
}
