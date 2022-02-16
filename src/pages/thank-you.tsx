import React, { Component, useState } from "react"
import { Link, withPrefix, graphql } from "gatsby"
import { Navbar, SiteMetadata } from "../components"
import { Layout } from "../layouts/Layout"
import { HeaderWithImage } from "../components/HeaderWithImage"

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
  return (
    <Layout>
      <SiteMetadata
        title="Project Portal - About"
        description="Questions from East Evidencia"
      />

      <Navbar activePage="about" />

      <HeaderWithImage
        title="Thank You"
        lede=""
        imageSrc={data.bgImage.childImageSharp.resize.src}
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
    bgImage: file(relativePath: { regex: "/^contact.jpg$/" }) {
      childImageSharp {
        resize(width: 1536, height: 352) {
          src
        }
      }
    }
  }
`
