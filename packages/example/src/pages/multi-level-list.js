import React from "react"
import { Layout } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/layouts"
import { MarkdownText } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

const markdownMultiLevelList =
  "- Collaborator.\n  - Details.\n  - Details.\n  - Details.\n    - Details.\n    - Details.\n    - Details.\n- Expertise.\n"

const LayoutTest = () => {
  return (
    <Layout
      showDevBanner={true}
      description={"Example page showing multi-level-lists"}
      title={"Multi-Level Lists"}
    >
      <MarkdownText text={markdownMultiLevelList} />
      <p>Paragraph text</p>
    </Layout>
  )
}

export default LayoutTest
