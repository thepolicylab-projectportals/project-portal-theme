import { Layout } from "./Layout"
import {
  CardProps,
  HeaderWithImage,
  MarkdownText,
  ProjectDetailLayoutProps,
} from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"
import React, { FunctionComponent, useEffect, useState } from "react"
import { isNA } from "../utils"
import * as JsSearch from "js-search"
import { SearchBar } from "../components/SearchBar"
import { ContactProps } from "./ContactPageLayout"
import { AboutProps } from "./AboutPageLayout"

interface SearchProps {
  aboutPage: AboutProps
  contactPage: ContactProps

  data: {
    site: { siteMetadata: { title } }
    allProject: {
      nodes: CardProps[]
    }
    generalPage: {
      pageName: string
      title: string
      header: string
      accessibility: string
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

export const SearchPageLayout: FunctionComponent<SearchProps> = ({
  aboutPage,
  contactPage,
  data,
}: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState([])
  let queryResults = []
  let search = new JsSearch.Search("slug")
  search.indexStrategy = new JsSearch.AllSubstringsIndexStrategy()
  search.sanitizer = new JsSearch.LowerCaseSanitizer()
  search.addIndex("topicNames")
  search.addIndex("question")
  search.addIndex("agency")
  search.addIndex("title")
  useEffect(() => {
    if (searchQuery.length > 0) {
      console.log(aboutPage)
      console.log(contactPage)
      console.log(data.allProject)
      search.addDocuments(data) // everything to search on
      let searchResults = search.search(searchQuery)
      console.log(searchResults)
      if (searchResults.length > 0) {
        queryResults = searchResults
      }
    }
  }, [searchQuery])

  return (
    <Layout
      activePage="search"
      title="Search"
      description="Searching across the site!"
    >
      <div style={{ margin: "0 auto" }}>
        <SearchBar
          label={"Search"}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="container pt-6 overflow-hidden bg-white">
        Number of items:
        {queryResults.length}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderRadius: "4px",
            border: "1px solid #d3d3d3",
          }}
        >
          <thead style={{ border: "1px solid #808080" }}>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: "5px",
                  fontSize: "14px",
                  fontWeight: 600,
                  borderBottom: "2px solid #d3d3d3",
                  cursor: "pointer",
                }}
              >
                Book ISBN
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "5px",
                  fontSize: "14px",
                  fontWeight: 600,
                  borderBottom: "2px solid #d3d3d3",
                  cursor: "pointer",
                }}
              >
                Book Title
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "5px",
                  fontSize: "14px",
                  fontWeight: 600,
                  borderBottom: "2px solid #d3d3d3",
                  cursor: "pointer",
                }}
              >
                Book Author
              </th>
            </tr>
          </thead>
          <tbody>
            {queryResults.map((item) => {
              return (
                <tr key={`row_${item.isbn}`}>
                  <td
                    style={{
                      fontSize: "14px",
                      border: "1px solid #d3d3d3",
                    }}
                  >
                    {item.isbn}
                  </td>
                  <td
                    style={{
                      fontSize: "14px",
                      border: "1px solid #d3d3d3",
                    }}
                  >
                    {item.title}
                  </td>
                  <td
                    style={{
                      fontSize: "14px",
                      border: "1px solid #d3d3d3",
                    }}
                  >
                    {item.author}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {!isNA(data.generalPage.accessibility) && (
        <section id="accessibility">
          <h2 className="text-h3 sm:text-h2 my-6">Accessibility Statement</h2>
          <MarkdownText
            className="mb-10 leading-normal text-body lg:text-body"
            text={data.generalPage.accessibility}
          />
        </section>
      )}
    </Layout>
  )
}
