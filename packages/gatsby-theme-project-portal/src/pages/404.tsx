import React from "react"
import { Link, graphql } from "gatsby"
import { Layout } from "../layouts"

export default () => {
  return (
    <Layout title="Error 404" description="Page not found">
      <div className="w-full py-20 px-8 lg:px-16 xl:px-24 lg:w-2/3">
        <h1 className="text-3xl font-extrabold leading-tight lg:text-5xl">
          Error 404
        </h1>
        <h3 className="text-lg font-medium lg:text-xl">
          The page you're looking for doesn't exist.
          <br />
          <br />
          <Link to="/" className="text-link">
            Go back to homepage
          </Link>
        </h3>
      </div>
    </Layout>
  )
}

export { Head } from "../hooks"

export const query = graphql`
  query {
    ...HeadData
    ...LayoutData
  }
`
