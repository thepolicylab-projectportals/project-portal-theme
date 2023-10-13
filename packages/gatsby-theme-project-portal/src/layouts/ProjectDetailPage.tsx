import React, { FunctionComponent } from "react"
import { graphql, Link, withPrefix } from "gatsby"
import { ImageDataLike } from "gatsby-plugin-image"
import {
  BackIcon,
  NewsletterProps,
  ProjectDetail,
  ProjectDetailProps,
} from "../components"

export { Head } from "../hooks"

// For the ProjectDetailPage we add the slug which isn't on the layout
interface ProjectDetailPageProps extends ProjectDetailProps {
  slug: string
}

// The query results we're interested in are hidden inside the data.project field in the query object
interface ProjectDetailPageQueryResults {
  data: {
    project: ProjectDetailPageProps
    site: {
      siteMetadata: {
        projectInterestLink: string
        staticText: {
          mainContact: {
            ongoingText: string
            completeText: string
          }
        }
        newsletter: NewsletterProps
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
      site: {
        siteMetadata: {
          projectInterestLink,
          staticText: {
            mainContact: { ongoingText, completeText },
          },
          newsletter,
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
          newsletter={newsletter}
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

export default ProjectDetailPage

export const query = graphql`
  query ProjectDetailPageQuery($slug: String!) {
    ...HeadData
    ...LayoutData
    page: project(slug: { eq: $slug }) {
      title: question
      description: summary
    }
    defaultContactImage: file(
      name: { eq: "default-contact" }
      extension: { in: ["png", "jpg", "jpeg"] }
      # only match files in the "themeImages" sourced directory:
      sourceInstanceName: { eq: "themeImages" }
    ) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          height: 100
          placeholder: BLURRED
          layout: FIXED
        )
      }
    }
    site {
      siteMetadata {
        projectInterestLink
        staticText {
          mainContact {
            ongoingText
            completeText
          }
        }
        newsletter {
          link
          text
        }
      }
    }
    project(slug: { eq: $slug }) {
      question
      title
      summary
      status
      opportunityCloses
      startDate
      endDate
      lastModified
      agency
      topics {
        ...TopicDetails
      }
      deliverable
      purpose
      expertise
      requirement
      keyDates
      priorResearch
      statusOfData
      fundingInfo
      openText: emailContent
      mainContact {
        name
        title
        employer
        email
        image {
          childImageSharp {
            gatsbyImageData(
              width: 100
              height: 100
              placeholder: BLURRED
              layout: FIXED
            )
          }
        }
      }
      projectTeam {
        name
        title
        employer
        email
        image {
          childImageSharp {
            gatsbyImageData(
              width: 100
              height: 100
              placeholder: BLURRED
              layout: FIXED
            )
          }
        }
      }
      faq {
        text
        title
      }
    }
  }
`
