import React, { FunctionComponent } from "react"
import { Link } from "gatsby"
import { Contact, MarkdownText } from "../components"
import { statusOutput } from "../utils"
import { useProjectPortalConfig, useStaticText } from "../hooks"
import { IGatsbyImageData } from "gatsby-plugin-image"

interface ProjectContactProps {
  name: string
  title: string
  employer: string
  email: string
  image?: IGatsbyImageData
  status: string
  emailContent?: string
}

export const MainContact: FunctionComponent<ProjectContactProps> = ({
  name,
  title,
  employer,
  email,
  image,
  status,
  emailContent,
}) => {
  const meta = useProjectPortalConfig()
  const staticText = useStaticText()
  const mainText =
    status === "open"
      ? emailContent
      : status === "ongoing"
      ? staticText.main_contact_text.ongoingText
      : staticText.main_contact_text.completeText
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
<<<<<<< Updated upstream
            meta.projectInterestLink || email ? (
              //There is projectInterestLink or email
              meta.projectInterestLink ? (
                //Using projectInterestLink
                <a
                  href={meta.projectInterestLink}
                  target="_blank"
                  rel="noopener"
                >
                  <button className="btn">Express interest</button>
                </a>
              ) : (
                //Using email
                <a href={`mailto:${email}`}>
                  <button className="btn">Email point of contact</button>
                </a>
              )
            ) : (
              // if neither projectInterestLink nor email, use contact form
              <Link to={"/contact"}>
                <button className="btn-white">Express interest</button>
=======
            meta.projectInterestLink ? (
              <a href={meta.projectInterestLink} target="_blank" rel="noopener">
                <button className="btn">Express interest</button>
              </a>
            ) : email ? (
              <a href={`mailto:${email}`}>
                <button className="btn">Email point of contact</button>
              </a>
            ) : (
              <Link to={"/contact"}>
                <button className="btn-white">Ask a question</button>
>>>>>>> Stashed changes
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
          <Contact
            {...{ name, title, employer, email, image }}
            showEmail={true}
          />
        </div>
      </div>
    </div>
  )
}
