import React from "react"
import { graphql } from "gatsby"
import { Cards, Navbar, SiteMetadata } from "../components"
import { Layout } from "../layouts/Layout"

export default ({ data }) => {
  return (
    <Layout>
      <SiteMetadata
        title="Project Portal"
        description="Question from East Evidencia."
      />

      <Navbar />

      <Cards nodes={data.items.nodes} />
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
