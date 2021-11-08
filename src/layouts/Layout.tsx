import React, { FunctionComponent, ReactNode } from "react"
import "@fontsource/public-sans"
import { Footer, SignupForm } from "../components"
import "../styles/style.css"

interface LayoutProps {
  children: ReactNode
}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full mx-0 bg-white border-0 xl:container xl:p-0 xl:mx-auto xl:border-l xl:border-r xl:border-gray-200 ">
      {children}
      <div className="py-8 mt-8 bg-white border-t border-b border-transparent dark:bg-transparent lg:py-16">
        <div className="container">
          <SignupForm />
        </div>
      </div>
      <Footer />
    </div>
  )
}
