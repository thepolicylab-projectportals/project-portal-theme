import React, { FunctionComponent, ReactNode } from "react"
import "@fontsource/public-sans"
import { Footer, SignupForm } from "../components"
import "../styles/style.css"

interface LayoutProps {
  children: ReactNode
}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-white sm:mx-0 sm:w-full lg:container lg:p-0 lg:mx-auto border-l border-r border-gray-200 ">
      {children}
      <div className="bg-white dark:bg-transparent border-t border-b border-transparent py-8 lg:py-16 mt-8">
        <div className="container">
          <SignupForm />
        </div>
      </div>
      <Footer />
    </div>
  )
}
