// Inspired by https://github.com/byebyers/ohmni-gatsby-template/blob/master/src/cms/preview-templates/BlogPostPreview.js

import React from "react"
import PropTypes from "prop-types"

// Components
import { ProjectDetailLayout } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

const ProjectDetailPreview = ({ entry, fieldsMetaData }) => {
  const data = entry.getIn(["data"]).toJS()

  // Get the MainContact data
  const mainContact = fieldsMetaData.getIn(["mainContact"]).toJS().contact[
    data.mainContact
  ]

  // Get the ProjectTeam data
  const projectTeamMapping = fieldsMetaData
    .getIn(["projectTeam"])
    .toJS().contact
  const projectTeam = data.projectTeam.map((slug) => projectTeamMapping[slug])

  console.log("MainContact", mainContact)
  console.log("projectTeam", projectTeam)

  return (
    <>
      <ProjectDetailLayout
        question={data.question}
        summary={data.summary}
        status={data.status}
        opportunityCloses={data.opportunityCloses}
        startDate={data.startDate}
        endDate={data.endDate}
        lastModified={data.lastModified}
        agency={data.agency}
        topics={data.topics}
        deliverable={data.deliverable}
        purpose={data.purpose}
        expertise={data.expertise}
        requirement={data.requirement}
        keyDates={data.keyDates}
        priorResearch={data.priorResearch}
        statusOfData={data.statusOfData}
        fundingInfo={data.fundingInfo}
        emailContent={data.emailContent}
        mainContact={null} // Need to extract queries out of MainContact
        projectTeam={projectTeam}
      />

      <section className="m-responsive">
        <h3 className="text-h3 my-4">Main Contact</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 justify-self-center">
          {data.mainContact}
        </div>
      </section>
      <hr />
    </>
  )
}

ProjectDetailPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default ProjectDetailPreview
