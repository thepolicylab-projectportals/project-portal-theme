import React, { FunctionComponent } from "react"
import { Contact } from "../components"
import { statusOutput } from "../utils"

interface ProjectContactProps {
  name: string
  title: string
  employer: string
  email: string
  contactImage: any
  status: string
  date: Date
}

export const MainContact: FunctionComponent<ProjectContactProps> = ({
  name,
  title,
  employer,
  email,
  contactImage,
  status,
  date,
}) => {
  const openText = (
    <>
      Researchers should use this page to express their interest in
      participating and sign up for a short discussion with the project team.
      The project team will share more details about the project and answer any
      questions. We hope to select a collaborator by {date}.
    </>
  )

  const inProgressText = (
    <>
      As with all collaborations, we plan to post results and deliverables as
      soon as the project is complete. In the meantime, we welcome questions
      about the project.
    </>
  )

  const completeText = (
    <>
      We hope that you find the deliverables useful. We welcome questions about
      the project or how you might apply these results in your program.
    </>
  )

  console.log(
    statusOutput(
      status,
      "Interested in collaborating?",
      "The project is in progress.",
      "The project is complete."
    )
  )

  return (
    <div className="w-full px-4 py-8 my-4 bg-gray-100 lg:px-8 lg:w-1/3 lg:py-4 lg:rounded">
      <h3 className="mb-2 text-lg font-bold text-black">
        Project point of contact
      </h3>
      <Contact
        {...{ name, title, employer, email, contactImage }}
        showEmail={true}
      />
      <div>
        <h3 className="mt-4 mb-2 text-lg font-bold text-black">
          {statusOutput(
            status,
            "Interested in collaborating?",
            "The project is in progress.",
            "The project is complete."
          )}
        </h3>
        <p className="mt-2 text-black text-md">
          {statusOutput(status, openText, inProgressText, completeText)}
        </p>
        <div className="mt-4">
          <button className="px-4 py-3 mt-2 mr-2 text-sm font-bold text-white rounded bg-rust-500 hover:bg-blue-700">
            Express Interest
          </button>
          <button className="px-4 py-3 mt-2 text-sm font-bold text-white rounded bg-rust-500 hover:bg-blue-700">
            Ask a question
          </button>
        </div>
      </div>
    </div>
  )
}
