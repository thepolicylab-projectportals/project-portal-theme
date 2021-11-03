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
    </Layout>
  )
}
