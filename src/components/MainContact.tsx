import React, { FunctionComponent } from "react"
import { Link } from "gatsby"
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

  return (
    <aside className="w-full p-8 my-8 bg-gray-100 lg:my-0 lg:max-w-md">
      <h4>Project point of contact</h4>
      <div className="my-6">
        <Contact
          {...{ name, title, employer, email, contactImage }}
          showEmail={false}
        />
      </div>
      <div>
        <h4>
          {statusOutput(
            status,
            "Interested in collaborating?",
            "The project is in progress.",
            "The project is complete."
          )}
        </h4>
        <p className="mt-2 text-black text-md">
          {statusOutput(status, openText, inProgressText, completeText)}
        </p>
        <div className="mt-4">
          {status === "open" ? (
            <a href={`mailto:${email}`}>
              <button className="btn">Email point of contact</button>
            </a>
          ) : (
            <Link to={"/contact"}>
              <button className="btn-white">Ask a question</button>
            </Link>
          )}
        </div>
      </div>
    </aside>
  )
}
