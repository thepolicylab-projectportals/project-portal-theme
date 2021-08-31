import React from "react"
import { graphql } from "gatsby"
import { Cards, Navbar, SiteMetadata } from "../components"
import { Layout } from "../layouts/Layout"

export default ({ data }) => {
  return (
    <Layout>
      <SiteMetadata
        title="Project Portal"
        description="Questions from East Evidencia."
      />

      <Navbar />

      <div className="container pt-6 overflow-hidden bg-white">
        <div className="flex flex-wrap">
          <div className="w-full sm:w-2/3 lg:1/2">
            <h2 className="text-3xl font-bold pb-3 text-gray-600">
              Open research opportunities
            </h2>
            <p className="text-sm leading-snug">
              We are assembling an interdisciplinary network of partners, who
              collectively can provide methodological expertise related to
              design, data analytics, and field experimentation, as well as
              domain knowledge related to the topics. There are opportunities
              for every-level to highly-experienced scientists.
            </p>
          </div>
        </div>
      </div>

      <Cards nodes={data.items.nodes} />

      <div className="container pt-8 overflow-hidden bg-white">
        <div className="flex flex-wrap">
          <div className="w-full sm:w-2/3 lg:w-1/2">
            <h2 className="text-3xl font-bold pb-3 text-gray-600">
              Curious to learn more? See findings from completed projects.
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/3 lg:w-1/4">
            <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded text-sm py-3">
              View completed projects
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query IndexQuery($tableName: String!) {
    items: allAirtable(filter: { table: { eq: $tableName } }) {
      nodes {
        data {
          question
          slug
          summary
          deliverable
          expertise
          timeline
          commitment
          contact
          collaborationType
        }
      }
    }
  }
`
