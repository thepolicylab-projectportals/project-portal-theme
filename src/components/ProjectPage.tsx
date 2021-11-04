import React from "react"
import { Link, withPrefix } from "gatsby"
import { Cards, CardProps, Navbar, SiteMetadata } from "../components"
import { Layout } from "../layouts/Layout"

export interface ProjectPageProps {
  title: string
  lede: string
  footerTitle: string
  footerText: string
  footerButton: string
  footerLink: string
  data: {
    items: {
      nodes: {
        data: CardProps
      }[]
    }
  }
}

export const ProjectPage = ({
  title,
  data,
  lede,
  footerTitle,
  footerText,
  footerButton,
  footerLink,
}: ProjectPageProps) => {
  return (
    <Layout>
      <SiteMetadata
        title="Project Portal"
        description="Questions from East Evidencia."
      />

      <Navbar />

      <div
        className="container px-16 py-12 overflow-hidden bg-rust"
        style={{
          background: `url(${withPrefix("/static/images/bg-index.png")})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto",
          backgroundPositionY: "bottom",
        }}
      >
        <div className="flex flex-wrap m-4">
          <div className="w-full sm:w-2/3 lg:1/2 bg-white p-8">
            <h2 className="text-4xl font-bold pb-3 text-gray-600">{title}</h2>
            <p className="text-lg leading-normal">{lede}</p>
          </div>
        </div>
      </div>

      <Cards nodes={data.items.nodes} />

      <div
        className="container py-8 overflow-hidden mt-12 px-16"
        style={{ backgroundColor: "#F7F7F7" }}
      >
        <div className="flex flex-wrap">
          <div className="sm:w-full lg:w-2/3">
            <h2 className="text-3xl font-bold pb-3 text-gray-600">
              {footerTitle}
            </h2>
            <div className="mt-2 text-md">{footerText}</div>
            <div>
              <Link to={footerLink}>
                <button className="bg-rust-500 hover:bg-rust-200 text-white font-bold mt-4 py-2 px-12 rounded text-sm py-3">
                  {footerButton}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
