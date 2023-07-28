import React, { FunctionComponent } from "react"
import { ProjectDetailLayout } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

export const ProjectDetailPreview: FunctionComponent = ({
  entry,
  fieldsMetadata,
}) => {
  console.log(
    "in ProjectDetailPreview",
    entry,
    entry.getIn(["data", "question"])
  )

  return (
    <ProjectDetailLayout
      title={entry.getIn(["data", "title"])}
      question={entry.getIn(["data", "question"])}
      agency={entry.getIn(["data", "agency"])}
      endDate={entry.getIn(["data", "endDate"])}
      summary={entry.getIn(["data", "summary"])}
      status={entry.getIn(["data", "status"])}
      opportunityCloses={entry.getIn(["data", "opportunityCloses"])}
      startDate={entry.getIn(["data", "startDate"])}
      lastModified={entry.getIn(["data", "lastModified"])}
      topics={entry.getIn(["data", "topics"])}
      deliverable={entry.getIn(["data", "deliverable"])}
      purpose={entry.getIn(["data", "purpose"])}
      expertise={entry.getIn(["data", "expertise"])}
      requirement={entry.getIn(["data", "requirement"])}
      keyDates={entry.getIn(["data", "keyDates"])}
      priorResearch={entry.getIn(["data", "priorResearch"])}
      statusOfData={entry.getIn(["data", "statusOfData"])}
      fundingInfo={entry.getIn(["data", "fundingInfo"])}
      emailContent={entry.getIn(["data", "emailContent"])}
      mainContact={entry.getIn(["data", "mainContact"])}
      projectTeam={entry.getIn(["data", "projectTeam"])}
      faq={entry.getIn(["data", "faq", ["question", "answer"]])}
      mainContactOngoingText={entry.getIn(["data", "mainContactOngoingText"])}
      mainContactCompleteText={entry.getIn(["data", "mainContactCompleteText"])}
      projectInterestLink={entry.getIn(["data", "projectInterestLink"])}
    />
  )
}
