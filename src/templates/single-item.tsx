import { graphql } from "gatsby"
import React, { FunctionComponent } from "react"
import { Feature, SiteMetadata } from "../components"
import { useModal } from "../context"
import { Layout } from "../layouts/Layout"

interface SingleItemProps {
  data: {
    item: {
      data: {
        question: string
        slug: string
        summary: string
        deliverable: string
        expertise: string
        timeline: string
        commitment: string
        contact: string
      }
    }
  }
  location: any
}

export const SingleItem: FunctionComponent<SingleItemProps> = (props) => {
  const { data, location } = props
  const {
    question,
    slug,
    summary,
    deliverable,
    expertise,
    timeline,
    commitment,
    contact,
  } = data.item.data
  const navigation = location.state ? location.state.navigation : null
  const { modal } = useModal()

  return (
    <Layout navigation={navigation}>
      <SiteMetadata title={question} description={summary} />
      <article className={modal && "max-h-80vh md:max-h-90vh overflow-auto"}>
        <div className={modal ? "p-4 lg:p-8" : "container py-8"}>
          <h1 className="text-2xl lg:text-3xl text-blue-500 dark:text-blue-400 font-bold leading-tight">
            {question}
          </h1>

          <div className="flex flex-wrap">
            <div className="w-full pb-4 lg:w-3/5 lg:pr-4 lg:pb-0">
              <Feature label="Summary" value={summary} truncate={false} />
              <Feature label="Expertise needed" value={expertise} />
            </div>
            <div className="w-full lg:w-2/5 lg:pl-4">
              <Feature label="Deliverable" value={deliverable} />
              <Feature label="Timeline" value={timeline} />
              <Feature label="Commitment" value={commitment} />
            </div>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default SingleItem

export const query = graphql`
  query SingleItemQuery($slug: String!) {
    item: airtable(data: { slug: { eq: $slug } }) {
      data {
        question
        slug
        summary
        deliverable
        expertise
        timeline
        commitment
        contact
      }
    }
  }
`
