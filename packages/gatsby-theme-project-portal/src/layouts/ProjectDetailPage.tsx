import { BackIcon, ProjectDetail, ProjectDetailProps } from "../components"
import React, { FunctionComponent } from "react"
import { Link, withPrefix } from "gatsby"
import { ImageDataLike } from "gatsby-plugin-image"

// For the ProjectDetailPage we add the slug which isn't on the layout
interface ProjectDetailPageProps extends ProjectDetailProps {
  slug: string
}

// The query results we're interested in are hidden inside the data.project field in the query object
interface ProjectDetailPageQueryResults {
  data: {
    project: ProjectDetailPageProps
    projectPortalConfig: {
      projectInterestLink: string
      staticText: {
        mainContactText: {
          ongoingText: string
          completeText: string
        }
      }
    }
    defaultContactImage: ImageDataLike
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
          mainContactText: { ongoingText, completeText },
        },
      },
      defaultContactImage,
    },
  } = props

  return (
    <>
      <main>
        <ProjectDetail
          {...project}
          ongoingText={ongoingText}
          completeText={completeText}
          projectInterestLink={projectInterestLink}
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
