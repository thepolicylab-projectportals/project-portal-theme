import { Layout } from "./Layout"
import {
  BackIcon,
  ProjectDetailLayout,
  ProjectDetailLayoutProps,
} from "../components"
import React, { FunctionComponent } from "react"
import { Link, withPrefix } from "gatsby"
import { statusOutput } from "../utils"
import { useProjectPortalConfig } from "../hooks"

// For the ProjectDetailPage we add the slug which isn't on the layout
interface ProjectDetailPageProps extends ProjectDetailLayoutProps {
  slug: string
}

// The query results we're interested in are hidden inside the data.project field in the query object
interface ProjectDetailPageQueryResults {
  data: {
    project: ProjectDetailPageProps
  }
}

export const ProjectDetailPage: FunctionComponent<
  ProjectDetailPageQueryResults
> = (props) => {
  // Destructure the results of the query to get the props we need from the project
  const {
    data: { project },
  } = props

  const mainContactHeadline = statusOutput(
    project.status,
    "Interested in collaborating?",
    "The project is in progress.",
    "The project is complete."
  )

  const projectInterestLink = useProjectPortalConfig().projectInterestLink

  return (
    <Layout title={project.question} description={project.summary}>
      <main>
        <ProjectDetailLayout
          {...project}
          mainContactHeadline={mainContactHeadline}
          projectInterestLink={projectInterestLink}
        />
      </main>
      <div className="p-responsive pb-4">
        <section className="my-12">
          <Link
            to={withPrefix(
              `/${project.status === "open" ? "" : project.status}`
            )}
          >
            <button className="btn m-responsive">
              <BackIcon />
              <span className="pl-2">Back</span>
            </button>
          </Link>
        </section>
      </div>
    </Layout>
  )
}
