import { graphql, navigate } from "gatsby"
import Img from "gatsby-image"
import React, { FunctionComponent } from "react"
import { Feature, SiteMetadata, Navbar } from "../components"
import { Layout } from "../layouts/Layout"
import Markdown from "markdown-to-jsx"
import { ProjectContact } from "../components/ProjectContact"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebookSquare,
  faLinkedin,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

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
        commitment: string
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
        <h4 className="lg:text-xl text-lg font-bold pb-2">{label}</h4>
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
  const { data, location } = props
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
    commitment,
    contactName,
    contactTitle,
    contactEmail,
    contactImage,
  } = data.item.data
  const navigation = location.state ? location.state.navigation : null

  return (
    <Layout>
      <SiteMetadata title={question} description={summary} />

      <Navbar />

      <div className="my-4 mx-12 text-blue-500 underline">
        <a href="#" onClick={() => navigate(-1)}>
          Back to viewing opportunities
        </a>
      </div>

      <article>
        <div className="pt-12 bg-rust-500 pl-16 pb-12">
          <div className="flex flex-wrap">
            <div className="w-full pb-4 lg:w-4/5 lg:pr-4 lg:pb-0">
              <h1 className="text-2xl lg:text-4xl text-white font-semibold leading-tight pb-4">
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
              <h4 className="text-md font-bold text-white">
                Share this project
              </h4>
              <div>
                <a href="https://facebook.com" className="mr-1">
                  <FontAwesomeIcon
                    icon={faFacebookSquare}
                    size="lg"
                    className="text-white"
                  />
                </a>
                <a href="https://twitter.com" className="mr-1">
                  <FontAwesomeIcon
                    icon={faTwitterSquare}
                    size="lg"
                    className="text-white"
                  />
                </a>
                <a href="https://linkedin.com" className="mr-1">
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    size="lg"
                    className="text-white"
                  />
                </a>
                <a href="mailto:thepolicylab@brown.edu" className="mr-1">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    size="lg"
                    className="text-white"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 mb-4 mx-12 flex flex-wrap">
          <div className="mr-8 mt-2">
            <Feature
              label="Policy Areas"
              color="blue-200"
              value={policyAreas}
            />
          </div>
          <div className="mr-8 mt-2">
            <Feature
              label="Support Needed"
              color="purple-200"
              value={supportNeeded}
            />
          </div>
        </div>

        <div className="mt-12  mx-8">
          <div className="container">
            <div className="w-full text-xl lg:text-2xl font-bold">
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
              <div className="w-full lg:w-1/3 bg-gray-100 p-8">
                <h3 className="font-bold text-black text-lg mb-2">
                  Project point of contact
                </h3>
                <div className="flex flexwrap">
                  <Img
                    className="m-2 rounded-full"
                    alt={contactName}
                    fadeIn={false}
                    fixed={contactImage.localFiles[0].childImageSharp.fixed}
                  />
                  <div className="p-2">
                    <h3 className="font-bold text-black text-md mb-1">
                      {contactName}
                    </h3>
                    <p className="text-black text-md mb-1">{contactTitle}</p>
                    <p className="text-black text-md mb-1">{contactEmail}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-black text-lg mb-2 mt-4">
                    Interested in collaborating?
                  </h3>
                  <p className="text-md text-black mt-2">
                    Researchers should use this page to express their interest
                    in participating and sign up for a short discussion with the
                    project team. The project team will share more details about
                    the project and answer any questions. We hope to select a
                    collaborator by {endDate}.
                  </p>
                  <div className="mt-4">
                    <button className="bg-rust-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm py-3 mr-2 mt-2">
                      Express Interest
                    </button>
                    <button className="bg-rust-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm py-3 mt-2">
                      Ask a question
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-300 text-center mx-12 my-8" />

        <div className="container mx-8 my-4">
          <div className="flex flex-wrap">
            <div className="w-full text-xl lg:text-2xl font-bold pb-2">
              <h2>Collaborator details</h2>
            </div>
            <div className="w-full lg:w-1/3 px-4">
              <SectionOfItem label="Expertise needed" value={expertise} />
            </div>
            <div className="w-full lg:w-1/3 px-4">
              <SectionOfItem
                label="Requirements and restrictions"
                value={requirement}
              />
            </div>
            <div className="w-full lg:w-1/3 px-4">
              <SectionOfItem label="Key dates" value={keyDates} />
            </div>
          </div>
        </div>

        <hr className="border-gray-300 text-center mx-12 my-8" />

        <div className="container mx-8 my-4 border-top-">
          <div className="flex flex-wrap">
            <div className="w-full text-xl lg:text-2xl font-bold pb-2">
              <h2>Project details</h2>
            </div>
            <div className="w-full lg:w-1/3 px-4">
              <SectionOfItem
                label="Status of associated data"
                value={statusOfData}
              />
            </div>
            <div className="w-full lg:w-1/3 px-4">
              <SectionOfItem
                label="Prior research and background"
                value={priorResearch}
              />
            </div>
            <div className="w-full lg:w-1/3 px-4">
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
        commitment
        contactName
        contactTitle
        contactEmail
        contactImage {
          localFiles {
            id
            childImageSharp {
              fixed: fixed(width: 100, height: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`
