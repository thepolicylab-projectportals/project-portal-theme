import React from "react"
import { Layout } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/layouts"
import { MarkdownText } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

const oneLevelList =
  "# One-Level List\n- Collaborator.\n- Expertise.\n- Awesome.\n\nParagraph Text."

const twoLevelList =
  "# Two-Level List\n- Collaborator.\n  - Details.\n  - Details.\n  - Details.\n- Expertise.\n\nParagraph Text."

const threeLevelList =
  "# Three-Level List\n- Collaborator.\n  - L2.\n    - Details.\n    - Details.\n      - Details.\n      - Details.\n      - Details.\n- Expertise.\n\nParagraph Text."

const fiveLevelList =
  "# Five-Level List\n- L1.\n  - L2.\n    - L3.\n      - L4.\n        - Details.\n        - Details.\n        - Details.\n- Expertise.\n\nParagraph Text."

const oneLevelListWithAdditionalParagraph =
  '# One-Level List With Additional Paragraph\n- Collaborator.\n\n  And another line under "Collaborator"\n- Expertise.\n- Awesome.\n\nParagraph Text.'

const LayoutTest = () => {
  return (
    <Layout
      showDevBanner={true}
      description={"Example page showing multi-level-lists"}
      title={"Multi-Level Lists"}
    >
      <MarkdownText text={oneLevelList} />
      <MarkdownText text={twoLevelList} />
      <MarkdownText text={threeLevelList} />
      <MarkdownText text={fiveLevelList} />

      <MarkdownText text={oneLevelListWithAdditionalParagraph} />
    </Layout>
  )
}

export default LayoutTest
