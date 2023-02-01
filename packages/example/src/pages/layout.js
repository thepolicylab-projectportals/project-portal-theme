import React from "react"
import { Layout } from "@hollandjg/gatsby-theme-project-portal/src/layouts"
import { CollaboratorDetails } from "@hollandjg/gatsby-theme-project-portal/src/components"

const collaborator_details = {
  expertise: "- Collaborator.\n- Details.\n- Expertise.\n",
  requirement: "Must be a collaborator\n",
  keyDates:
    "We are ready to begin the project as soon as we identify a collaborator.\n",
}

const LayoutTest = () => {
  const children = <CollaboratorDetails {...collaborator_details} />
  return (
    <>
      <h1>Layout with default dev banner from theme.</h1>
      <Layout>{children}</Layout>
      <h1>Layout with explicitly set "false" dev banner</h1>
      <Layout showDevBanner={false}>{children}</Layout>
      <h1>Layout with explicitly set "true" dev banner</h1>
      <Layout showDevBanner={true}>{children}</Layout>
    </>
  )
}

export default LayoutTest
