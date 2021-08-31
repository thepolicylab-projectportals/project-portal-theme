import React from "react"
import { FunctionComponent } from "react"
import { ReactNode } from "react"
import { Footer, SignupForm } from "../components"

interface LayoutFullProps {
  children: ReactNode
}

export const LayoutFull: FunctionComponent<LayoutFullProps> = ({
  children,
}) => {
  return (
    <div className="bg-white">
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
