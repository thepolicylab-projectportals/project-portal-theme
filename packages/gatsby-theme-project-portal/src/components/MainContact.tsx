import React, { FunctionComponent } from "react"
import { Link } from "gatsby"
import { IGatsbyImageData } from "gatsby-plugin-image"
import { statusOutput } from "../utils"
import { Contact, MarkdownText } from "."

interface ProjectContactProps {
  name: string
  title: string
  employer: string
  email: string
  image?: IGatsbyImageData
  status: string
  projectInterestLink?: string
  mainText: string
  defaultContactImage?: IGatsbyImageData
}

export const MainContact: FunctionComponent<ProjectContactProps> = ({
  name,
  title,
  employer,
  email,
  image,
  status,
  projectInterestLink,
  mainText,
  defaultContactImage,
}) => {
  return (
    <div className="w-full lg:w-2/5 xl:w-1/3">
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
          <MarkdownText text={mainText} />
        </div>
        <div className="mt-4">
          {status === "open" ? (
            projectInterestLink ? (
              <a href={projectInterestLink} target="_blank" rel="noopener">
                <button className="btn">Express interest</button>
              </a>
            ) : email ? (
              <a href={`mailto:${email}`}>
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
          <Contact
            {...{ name, title, employer, email }}
            showEmail={true}
            image={image ?? defaultContactImage}
          />
        </div>
      </div>
    </div>
  )
}
