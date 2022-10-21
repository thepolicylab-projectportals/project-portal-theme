import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { Layout } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/layouts"
import { Contact } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

const Index = () => {
  const { firstContact } = useStaticQuery(graphql`
    query SingleContactQuery {
      firstContact: contact(key: { eq: "first-contact" }) {
        id
        key
        employer
        email
        name
        title
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
    }
  `)
  console.log(firstContact)
  return (
    <Layout title={"the title"} description={"the description"}>
      <h1>Heading 1</h1>
      <Contact {...firstContact} />
    </Layout>
  )
}

export default Index
