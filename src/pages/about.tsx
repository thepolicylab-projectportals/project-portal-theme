import React from "react"
import { Navbar, SiteMetadata } from "../components"
import { Layout } from "../layouts/Layout"

export default () => {
  return (
    <Layout>
      <SiteMetadata
        title="Project Portal - About"
        description="Questions from East Evidencia"
      />

      <Navbar />

      <div className="container pt-6 overflow-hidden bg-white">
        <div className="flex flex-wrap">
          <div className="w-2/3">
            <h2 className="text-2xl lg:text-5xl font-bold text-black dark:text-white tracking-tight">
              San Antonio Research Partnerships Portal Goals
            </h2>

            <h3 className="text-xl lg:text-3xl font-bold text-black dark:text-white tracking-tight">
              Connect government and researchers to improve the lives of San
              Antonio residents
            </h3>
          </div>
        </div>
      </div>
    </Layout>
  )
}
