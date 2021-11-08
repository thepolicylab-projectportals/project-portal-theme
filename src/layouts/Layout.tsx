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
        title={"Help us shape the future of the partnerships portal!"}
        text={
          "This portal is part of a pilot on new ways to connect academics with research opportunities in government. If you are interested in contributing to the project, we’d like to get in touch."
        }
        link={"/feedback"}
        buttonText={"Share your feedback"}
      />
      <Footer />
    </div>
  )
}
