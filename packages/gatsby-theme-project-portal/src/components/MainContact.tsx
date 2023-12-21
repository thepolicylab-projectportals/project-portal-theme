import React, { FunctionComponent } from "react"
import { Link } from "gatsby"
import { statusOutput } from "../utils"
import { Contact, MarkdownText, ContactType } from "."

interface ProjectContactProps extends ContactType {
  status: string
  projectInterestLink?: string
  openText: string
  ongoingText: string
  completeText: string
}

export const MainContact: FunctionComponent<ProjectContactProps> = ({
  status,
  projectInterestLink,
  openText,
  ongoingText,
  completeText,
  ...contactProps
}) => {
  return (
    <>
      <h3 class="hidden">Contact and Project Updates</h3>
      <div className="w-full p-8 mb-8 bg-gray-100">
        <h4 className="text-h4">
          {statusOutput(
            status,
            "This project is open. Interested in collaborating?",
            "The project is in progress.",
            "The project is complete."
          )}
        </h4>
        <div className="text-black text-body">
          <MarkdownText
            text={statusOutput(status, openText, ongoingText, completeText)}
          />
        </div>
        <div className="mt-4">
          {status === "open" ? (
            projectInterestLink ? (
              <a href={projectInterestLink} target="_blank" rel="noopener">
                <button className="btn">Express interest</button>
              </a>
            ) : contactProps.email ? (
              <a href={`mailto:${contactProps.email}`}>
                <button className="btn">Email point of contact</button>
              </a>
            ) : (
              <Link to={"/contact"}>
                <button className="btn-white">Ask a question</button>
              </Link>
            )
          ) : (
            <Link to={"/contact"}>
              <button className="btn-white">Ask a question</button>
            </Link>
          )}
        </div>
      </div>
      <div className="w-full p-8 my-8 bg-gray-100">
        <h4 className="text-h4">Project point of contact</h4>
        <div className="mt-4 text-body">
          <Contact {...contactProps} showEmail={true} />
        </div>
      </div>
    </>
  )
}
