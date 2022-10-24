import React from "react"
import { Layout } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/layouts"
import { Contact } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

const Index = () => {
  return (
    <Layout title={"the title"} description={"the description"}>
      <h1>Heading 1</h1>
      <Contact
        name="Isabel"
        title="The Boss"
        email="isabel@gsdc.ccv.brown.edu"
        showEmail={true}
        employer="Brown University"
      />
    </Layout>
  )
}

export default Index
