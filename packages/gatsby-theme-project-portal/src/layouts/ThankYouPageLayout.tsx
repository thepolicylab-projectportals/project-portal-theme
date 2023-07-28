import React, { FunctionComponent } from "react"
import { Link } from "gatsby"
import { HeaderWithImage } from "../components"

interface ThankYouProps {
  data: {
    page: {
      image: {
        childImageSharp: {
          resize: {
            src: string
          }
        }
      }
    }
  }
}

export const ThankYouPageLayout: FunctionComponent<ThankYouProps> = ({
  data,
}: ThankYouProps) => {
  return (
    <main>
      <HeaderWithImage
        title="Thank You"
        lede=""
        imageSrc={data.page.image?.childImageSharp.resize.src}
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
    </main>
  )
}
