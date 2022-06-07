import React, { FunctionComponent } from "react"
import { Link } from "gatsby"
import { Contact, MarkdownText } from "../components"
import { statusOutput } from "../utils"
import useSiteMetadata from "../hooks/useSiteMetadata"

interface ProjectContactProps {
  name: string
  title: string
  employer: string
  email: string
  contactImage: any
  status: string
  date: Date
  emailContent: string
}

export const MainContact: FunctionComponent<ProjectContactProps> = ({
  name,
  title,
  employer,
  email,
  contactImage,
  status,
  emailContent,
}) => {
  const ongoingText =
    "We plan to post results and deliverables when the project is complete. In the meantime, we welcome questions about the project."

  const completeText =
    "We’re eager to learn how you use the results and welcome any questions."

  const mainText =
    status === "open"
      ? emailContent
      : status === "ongoing"
      ? ongoingText
      : completeText

  const meta = useSiteMetadata()

  return (
    <div className="w-full lg:w-2/5 xl:w-1/3">
      <div className="w-full p-8 mb-8 bg-gray-100">
        <h4 className="text-h4">
          {statusOutput(
            status,
            "Interested in collaborating?",
            "The project is in progress.",
            "The project is complete."
          )}
        </h4>
        <div className="text-black text-body">
          <MarkdownText text={mainText} />
        </div>
        <div className="mt-4">
          {status === "open" ? (
            meta.projectInterestLink ? (
              <a href={meta.projectInterestLink} target="_blank" rel="noopener">
                <button className="btn">Express interest</button>
              </a>
            ) : (
              <a href={`mailto:${email}`}>
                <button className="btn">Email point of contact</button>
              </a>
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
          <Contact
            {...{ name, title, employer, email, contactImage }}
            showEmail={true}
          />
        </div>
      </div>
    </div>
  )
}
