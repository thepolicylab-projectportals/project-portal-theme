import { graphql, navigate } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React, { FunctionComponent } from "react"
import { Feature, SiteMetadata, Navbar } from "../components"
import { Layout } from "../layouts/Layout"
import Markdown from "markdown-to-jsx"
import { ProjectContact } from "../components/ProjectContact"
import {
  FaFacebookSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaEnvelope,
} from "react-icons/fa"

interface ProjectDetailProps {
  data: {
    item: {
      data: {
        question: string
        partnerName: string
        slug: string
        summary: string
        status: string
        startDate: Date
        endDate: Date
        agency: string
        policyAreas: string[]
        supportNeeded: string[]
        deliverable: string
        purpose: string
        expertise: string
        requirement: string
        keyDates: string
        priorResearch: string
        statusOfData: string
        fundingInfo: string
        contactName: string
        contactTitle: string
        contactEmail: string
        contactImage: any
      }
    }
  }
  location: any
}

interface SectionOfItemProps {
  label: string
  value: string
}

const LiItem = ({ children, ...props }) => {
  props["className"] = "list-style-type-dash"
  return (
    <li {...props}>
      <span>{children}</span>
    </li>
  )
}

const SectionOfItem: FunctionComponent<SectionOfItemProps> = ({
  label,
  value,
}) => {
  return (
    <>
      <section className="pt-4">
        <h4 className="pb-2 text-lg font-bold lg:text-xl">{label}</h4>
        <div className="text-md">
          <Markdown
            options={{
              overrides: {
                ul: {
                  props: {
                    className: "list-inside list-style-type-dash",
                  },
                },
                li: {
                  component: LiItem,
                },
                a: {
                  props: {
                    className: "underline hover:no-underline",
                  },
                },
              },
            }}
          >
            {value}
          </Markdown>
        </div>
      </section>
    </>
  )
}

const ProjectDetail: FunctionComponent<ProjectDetailProps> = (props) => {
  const { data } = props
  const {
    question,
    partnerName,
    slug,
    summary,
    status,
    startDate,
    endDate,
    agency,
    policyAreas,
    supportNeeded,
    deliverable,
    expertise,
    requirement,
    purpose,
    keyDates,
    priorResearch,
    statusOfData,
    fundingInfo,
    contactName,
    contactTitle,
    contactEmail,
    contactImage,
  } = data.item.data

  return (
    <Layout>
      <SiteMetadata title={question} description={summary} />

      <Navbar />

      <div className="mx-12 my-4 text-blue-500 underline">
        <a href="#" onClick={() => navigate(-1)}>
          Back to viewing opportunities
        </a>
      </div>

      <article>
        <div className="pt-12 pb-12 pl-16 bg-rust-500">
          <div className="flex flex-wrap">
            <div className="w-full pb-4 lg:w-4/5 lg:pr-4 lg:pb-0">
              <h1 className="pb-4 text-4xl font-semibold leading-tight text-white">
                {question}
              </h1>
              <div className="text-white text-md">
                <span className="font-bold">Opportunity closes: </span>
                {endDate}
              </div>
              <div className="text-white text-md">
                <span className="font-bold">Agency: </span>
                {agency}
              </div>
            </div>
            <div className="w-full lg:w-1/5">
              <h4 className="font-bold text-white text-md">
                Share this project
              </h4>
              <div className="mt-1">
                <a
                  href="https://facebook.com"
                  className="inline-block mr-1 text-xl text-white"
                >
                  <FaFacebookSquare />
                </a>
                <a
                  href="https://twitter.com"
                  className="inline-block mr-1 text-xl text-white"
                >
                  <FaTwitterSquare />
                </a>
                <a
                  href="https://linkedin.com"
                  className="inline-block mr-1 text-xl text-white"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="mailto:thepolicylab@brown.edu"
                  className="inline-block mr-1 text-xl text-white"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap mx-12 mt-4 mb-4">
          <div className="mt-2 mr-8">
            <Feature
              label="Policy Areas"
              color="blue-200"
              value={policyAreas}
            />
          </div>
          <div className="mt-2 mr-8">
            <Feature
              label="Support Needed"
              color="purple-200"
              value={supportNeeded}
            />
          </div>
        </div>

        <div className="mx-8 mt-12">
          <div className="container">
            <div className="w-full text-xl font-bold lg:text-2xl">
              <h2>Project overview</h2>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full pb-4 lg:w-2/3 lg:pr-4 lg:pb-0">
                <div>
                  <SectionOfItem px-4 label="Summary" value={summary} />
                </div>
                <div className="mt-4">
                  <SectionOfItem
                    label="Anticipated deliverables"
                    value={deliverable}
                  />
                </div>
                <div className="mt-4">
                  <SectionOfItem
                    label="How results will be used"
                    value={purpose}
                  />
                </div>
              </div>
              <div className="w-full p-8 bg-gray-100 lg:w-1/3">
                <h3 className="mb-2 text-lg font-bold text-black">
                  Project point of contact
                </h3>
                <div className="flex flex-wrap">
                  <GatsbyImage
                    className="m-2 rounded-full"
                    alt={contactName}
                    image={getImage(contactImage.localFiles[0])}
                  />
                  <div className="p-2">
                    <h3 className="mb-1 font-bold text-black text-md">
                      {contactName}
                    </h3>
                    <p className="mb-1 text-black text-md">{contactTitle}</p>
                    <p className="mb-1 text-black text-md">{contactEmail}</p>
                  </div>
                </div>
                <div>
                  <h3 className="mt-4 mb-2 text-lg font-bold text-black">
                    Interested in collaborating?
                  </h3>
                  <p className="mt-2 text-black text-md">
                    Researchers should use this page to express their interest
                    in participating and sign up for a short discussion with the
                    project team. The project team will share more details about
                    the project and answer any questions. We hope to select a
                    collaborator by {endDate}.
                  </p>
                  <div className="mt-4">
                    <button className="px-4 py-2 py-3 mt-2 mr-2 text-sm font-bold text-white rounded bg-rust-500 hover:bg-blue-700">
                      Express Interest
                    </button>
                    <button className="px-4 py-2 py-3 mt-2 text-sm font-bold text-white rounded bg-rust-500 hover:bg-blue-700">
                      Ask a question
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="mx-12 my-8 text-center border-gray-300" />

        <div className="container mx-8 my-4">
          <div className="flex flex-wrap">
            <div className="w-full pb-2 text-xl font-bold lg:text-2xl">
              <h2>Collaborator details</h2>
            </div>
            <div className="w-full px-4 lg:w-1/3">
              <SectionOfItem label="Expertise needed" value={expertise} />
            </div>
            <div className="w-full px-4 lg:w-1/3">
              <SectionOfItem
                label="Requirements and restrictions"
                value={requirement}
              />
            </div>
            <div className="w-full px-4 lg:w-1/3">
              <SectionOfItem label="Key dates" value={keyDates} />
            </div>
          </div>
        </div>

        <hr className="mx-12 my-8 text-center border-gray-300" />

        <div className="container mx-8 my-4 border-top-">
          <div className="flex flex-wrap">
            <div className="w-full pb-2 text-xl font-bold lg:text-2xl">
              <h2>Project details</h2>
            </div>
            <div className="w-full px-4 lg:w-1/3">
              <SectionOfItem
                label="Status of associated data"
                value={statusOfData}
              />
            </div>
            <div className="w-full px-4 lg:w-1/3">
              <SectionOfItem
                label="Prior research and background"
                value={priorResearch}
              />
            </div>
            <div className="w-full px-4 lg:w-1/3">
              <SectionOfItem label="Funding details" value={fundingInfo} />
            </div>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default ProjectDetail

export const query = graphql`
  query ProjectDetailQuery($slug: String!) {
    item: airtable(data: { slug: { eq: $slug } }) {
      data {
        question
        partnerName
        slug
        summary
        status
        startDate
        endDate
        agency
        policyAreas
        supportNeeded
        deliverable
        purpose
        expertise
        requirement
        keyDates
        priorResearch
        statusOfData
        fundingInfo
        contactName
        contactTitle
        contactEmail
        contactImage {
          localFiles {
            id
            childImageSharp {
              gatsbyImageData(width: 100, height: 100, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`
