import React from "react"
import { Link } from "gatsby"
import { Cards, CardProps, Navbar, SiteMetadata } from "../components"
import { Layout } from "../layouts/Layout"

export interface ProjectPageProps {
  title: string
  lede: string
  footerTitle: string
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

      <div className="container pt-6 overflow-hidden bg-white">
        <div className="flex flex-wrap">
          <div className="w-full sm:w-2/3 lg:1/2">
            <h2 className="text-4xl font-bold pb-3 text-gray-600">{title}</h2>
            <p className="text-lg leading-normal">{lede}</p>
          </div>
        </div>
      </div>

      <Cards nodes={data.items.nodes} />

      <div className="container pt-8 overflow-hidden bg-white">
        <div className="flex flex-wrap">
          <div className="w-full sm:w-2/3 lg:w-1/2">
            <h2 className="text-3xl font-bold pb-3 text-gray-600">
              {footerTitle}
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/3 lg:w-1/4">
            <Link to={footerLink}>
              <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded text-sm py-3">
                {footerButton}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
