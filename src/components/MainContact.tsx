import React, { FunctionComponent } from "react"
import { Link } from "gatsby"
import { Contact } from "../components"
import { statusOutput } from "../utils"
import Markdown from "markdown-to-jsx"

const LiItem = ({ children, ...props }) => {
  return (
    <li {...props}>
      <span>{children}</span>
    </li>
  )
}

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
  // const openText = (
  //   <>
  //     Researchers should use this page to express their interest in
  //     participating and sign up for a short discussion with the project team.
  //     The project team will share more details about the project and answer any
  //     questions. We hope to select a collaborator by{" "}
  //     {moment(date).format("MMMM D, YYYY")}.
  //   </>
  // )
  const ongoingText =
    "As with all collaborations, we plan to post results and deliverables as soon as the project is complete. In the meantime, we welcome questions about the project."

  const completeText =
    "We hope that you find the deliverables useful. We welcome questions about the project or how you might apply these results in your program."

  let mainText =
    status === "open"
      ? emailContent
      : status === "ongoing"
      ? ongoingText
      : completeText

  return (
    <div className="w-full lg:w-2/5 xl:w-1/3">
      <div className="w-full p-8 mb-8 bg-gray-100">
        <h4>
          {statusOutput(
            status,
            "Interested in collaborating?",
            "The project is ongoing.",
            "The project is complete."
          )}
        </h4>
        <Markdown
          className="text-black text-md"
          options={{
            wrapper: "div",
            forceWrapper: true,
            forceBlock: true,
            overrides: {
              ul: {
                props: {
                  className: "list-inside list-disc",
                },
              },
              a: {
                props: {
                  className: "underline hover:no-underline",
                },
              },
            },
          }}
        >
          {mainText}
        </Markdown>
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
      <div className="w-full p-8 my-8 bg-gray-100">
        <h4>Project point of contact</h4>
        <div className="mt-4">
          <Contact
            {...{ name, title, employer, email, contactImage }}
            showEmail={true}
          />
        </div>
      </div>
    </div>
  )
}
