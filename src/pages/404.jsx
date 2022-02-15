import React from "react"
import { SiteMetadata } from "../components"
import { Link } from "gatsby"

import "@fontsource/public-sans"
import "../styles/style.css"

const Page404 = () => {
  return (
    <div className="flex items-center min-h-screen">
      <SiteMetadata title="Error 404" description="Page not found" />
      <div className="container">
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
    </div>
  )
}

export default Page404
