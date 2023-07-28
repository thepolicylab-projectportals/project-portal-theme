import {
  BackIcon,
  ProjectDetailLayout,
  ProjectDetailLayoutProps,
} from "../components"
import React, { FunctionComponent } from "react"
import { Link, withPrefix } from "gatsby"
import { IGatsbyImageData } from "gatsby-plugin-image"

// For the ProjectDetailPage we add the slug which isn't on the layout
interface ProjectDetailPageProps extends ProjectDetailLayoutProps {
  slug: string
}

// The query results we're interested in are hidden inside the data.project field in the query object
interface ProjectDetailPageQueryResults {
  data: {
    project: ProjectDetailPageProps
    defaultContactImage: IGatsbyImageData
    projectPortalConfig: {
      projectInterestLink
      staticText: {
        main_contact_text: {
          ongoingText: string
          completeText: string
        }
      }
    }
  }
}

export const ProjectDetailPage: FunctionComponent<
  ProjectDetailPageQueryResults
> = (props) => {
  // Destructure the results of the query to get the props we need from the project
  const {
    data: {
      project,
      projectPortalConfig: {
        projectInterestLink,
        staticText: {
          main_contact_text: { ongoingText, completeText },
        },
      },
      defaultContactImage,
    },
  } = props

  return (
    <>
      <main>
        <ProjectDetailLayout
          {...project}
          projectInterestLink={projectInterestLink}
          mainContactOngoingText={ongoingText}
          mainContactCompleteText={completeText}
          defaultContactImage={defaultContactImage}
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
    </>
  )
}
