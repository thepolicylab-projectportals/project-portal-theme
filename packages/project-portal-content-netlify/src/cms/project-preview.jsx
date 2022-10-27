// Inspired by https://github.com/byebyers/ohmni-gatsby-template/blob/master/src/cms/preview-templates/BlogPostPreview.js

import React from "react"
import PropTypes from "prop-types"

// Components
import { ProjectDetailLayout } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

const ProjectDetailPreview = ({ entry }) => {
  const data = entry.getIn(["data"]).toJS()
  console.log("project data", data)

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
        mainContact={null}
        projectTeam={[]}
      />

      <section className="m-responsive">
        <h3 className="text-h3 my-4">Main Contact</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 justify-self-center">
          {data.mainContact}
        </div>
      </section>
      <hr />

      <section className="m-responsive">
        <h3 className="text-h3 my-4">Project Team</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 justify-self-center">
          {data.projectTeam.map((contact) => (
            <li className="w-auto px-4">{contact}</li>
          ))}
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
