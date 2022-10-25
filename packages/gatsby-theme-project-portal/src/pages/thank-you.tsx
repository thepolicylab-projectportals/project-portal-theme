import React from "react"
import { Link, graphql } from "gatsby"
import { Layout } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/layouts"
import { HeaderWithImage } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

interface ThankYouProps {
  data: {
    bgImage: {
      childImageSharp: {
        resize: {
          src: string
        }
      }
    }
  }
}

export default ({ data }: ThankYouProps) => {
  console.log(data)
  return (
    <Layout
      activePage="about"
      title="Thank you"
      description="Thank you for your interest in working with us!"
    >
      <HeaderWithImage
        title="Thank You"
        lede=""
        imageSrc={data.bgImage?.childImageSharp.resize.src}
      />
      <div className="container pt-6 overflow-hidden bg-white">
        <div className="flex flex-wrap">
          <div className="lg:w-2/3 sm:w-full">
            <h2 className="mb-8 text-2xl font-bold leading-loose tracking-tight text-black dark:text-white lg:text-5xl">
              Thank you for your interest!
            </h2>

            <p className="leading-normal text-md lg:text-lg">
              We'll get back to you as soon as possible. In the meantime,
              continue checking out our{" "}
              <Link to="/" className="underline">
                open projects
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ThankYouQuery {
    bgImage: file(relativePath: { regex: "/contact.jpg/" }) {
      childImageSharp {
        resize(width: 1536, height: 352) {
          src
        }
      }
    }
  }
`
