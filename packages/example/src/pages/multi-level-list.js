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

const realWorldText =
  "**The City of San Antonio’s Military and Veteran Affairs Department** **and the Office of Innovation will host a Q&A webinar on Friday, November 18 at 9am to discuss this project. A recording will be made available for those who can't attend. Invitations will be sent to the email address provided in the interest form so please submit your interest prior to the webinar to ensure you receive an invitation (research lead can share the invitation with group members).**\n\nThe City of San Antonio’s Military and Veteran Affairs Department (MVAD)’s mission centers around the retention and recruitment of military missions for the greater San Antonio area through two lines of effort: quality-of-life and mission readiness. Nationally, military spouse employment is stated to be between 20-40%. Military spouse employment is typically one of a Service Member’s top four considerations for retention in the military and thus has a direct effect on military readiness. Additionally, the Department of the Air Force uses spouse employment as a quality-of-life indicator and a factor in basing its decisions.  \n\nMVAD has invested staff time and funds into various collaborations and programs to tackle challenges associated with military spouse employment in SATX, with the goal of decreasing military spouse unemployment. Unfortunately, we do not have robust baseline data that we can use to determine program needs or measure program effectiveness. We are seeking help to determine whether and which available data sources meet our needs, identify data gaps, and develop a plan to address those gaps. \n\nOur hope is for this dataset to then be used to create an Excel product that will help us understand the current state of military spouse unemployment in SATX, including:\n\n* the number of military spouses and their employment status: \n\n  * total numbers living in the greater San Antonio area, by county\n  * who are unemployed, by job-seeking status\n  * who are employed \n  * who are underemployed (e.g. working less than full time, working in entry-level positions despite holding degrees)\n\n    * who are receiving assistance (e.g. WIC) or are living below the poverty line (by individual and household income) \n  * who are entrepreneurs, by business size (e.g. small, medium, large)\n* local and national comparisons of \n\n  * top barriers to employment\n  * average amount of time unemployed upon relocation\n\nThis tool will ideally include data from the last 10 years and should minimally include data from the past year. If possible, we hope to make comparisons with state and national level data. All data should be easily accessible by the public for transparency purposes, and easily updated by MVAD annually.\n\nHelpful Links: [Hiring Our Heroes Digital Resources](https://www.hiringourheroes.org/resources/?_resources_content_type=research)"

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

      <MarkdownText text={realWorldText} />
    </Layout>
  )
}

export default LayoutTest
