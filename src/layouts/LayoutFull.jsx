import React from "react"
import { Footer, SignupForm } from "../components"

export const LayoutFull = ({ children }) => {
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
