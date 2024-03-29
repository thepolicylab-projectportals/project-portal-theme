import React, { FunctionComponent } from "react"
import { graphql, Link } from "gatsby"
import { ImageDataLike } from "gatsby-plugin-image"
import { HeaderWithImage } from "../components"

export { Head } from "../hooks"

interface ThankYouProps {
  data: {
    generalPage: {
      image?: ImageDataLike
    }
  }
}

export const ThankYouPageLayout: FunctionComponent<ThankYouProps> = ({
  data: {
    generalPage: { image },
  },
}: ThankYouProps) => {
  return (
    <>
      <HeaderWithImage title="Thank You" lede="" image={image} />
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
    </>
  )
}

export default ThankYouPageLayout

export const query = graphql`
  query ThankYouQuery($slug: String!) {
    ...HeadData
    ...LayoutData
    page: generalPage(slug: { eq: $slug }) {
      title
      description: lede
    }
    generalPage(slug: { eq: $slug }) {
      image {
        ...HeaderWithImageBackground
      }
    }
  }
`
