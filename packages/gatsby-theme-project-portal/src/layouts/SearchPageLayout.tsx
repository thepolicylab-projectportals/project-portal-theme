import React, { FunctionComponent, useEffect, useState } from "react"
import lunr from "lunr"
import { SearchBar } from "../components/SearchBar"
import { isNull } from "lodash"

export interface SearchProps {
  searchNodes
}

export const SearchPageLayout: FunctionComponent<SearchProps> = ({
  searchNodes,
}: SearchProps) => {
  const siteUrl = searchNodes.siteUrl
  const [searchQuery, setSearchQuery] = useState([])
  const [queryResults, setQueryResults] = useState([])

  let documents = []

  Object.keys(searchNodes).forEach((page) => {
    if (page === "siteUrl") {
      return
    } else {
      if (page === "allProject") {
        searchNodes[page].nodes.forEach((node) => {
          if (!node.slug.includes("/")) {
            node.slug = `project/${node.slug}`
          }
        })
      }
      searchNodes[page].nodes.forEach((node) => {
        const newItem = Object.values(node).map((field) => {
          if (isNull(field)) {
            return null
          }

          if (typeof field === "object") {
            return Object.values(field)
              .filter((value) => !isNull(value))
              .map((value) =>
                typeof value === "string"
                  ? value
                  : Object.values(value)
                      .filter((k) => !isNull(k))
                      .join(" ")
              )
              .join(" ")
          } else {
            return field
          }
        })

        Object.keys(node).forEach((page, i) => {
          node[page] = newItem[i]
        })
        documents.push(node)
      })
    }
  })

  let db = documents.reduce(function (acc, document) {
    acc[document.slug] = document
    return acc
  }, {})

  let idx = lunr(function () {
    this.ref("slug") // identifier
    // fields to search
    this.field("slug")
    this.field("faq")
    this.field("aims")
    this.field("lede")
    this.field("title")
    this.field("question")
    this.field("status")
    this.field("agency")
    this.field("topics")
    this.field("mainContact")
    this.field("summary")
    this.field("status")
    this.field("purpose")
    this.field("emailContent")
    this.field("projectTeam")
    this.field("expertise")
    this.field("requirement")

    // allow access to the position of the found word in the field
    this.metadataWhitelist = ["position"]
    /* allow stop words (see https://github.com/olivernn/lunr.js/blob/master/lunr.js)
     we have 'about' as one of the slugs, which spurred this decision
    We can implement our own stopWordFilter:
    var idx = lunr(function () {
      // normal index definition
      this.pipeline.after(lunr.stopWordFilter, myStopWordFilter)
       this.pipeline.remove(lunr.stopWordFilter)
    })
     */
    this.pipeline.remove(lunr.stopWordFilter)

    documents.forEach(function (doc) {
      this.add(doc)
    }, this)
  })

  useEffect(() => {
    if (searchQuery.length > 0) {
      let searchResults = idx.search(searchQuery)
      let results = []
      searchResults.forEach(function (result) {
        results.push(db[result.ref])
      })
      setQueryResults(searchResults)
    } else {
      setQueryResults([])
    }
  }, [searchQuery])
  //const meta = useSiteMetadata()
  return (
    <div className="flex flex-col items-center justify-center align-middle text-center px-2">
      <div className="container mx-auto my-2 border-b-4 border-primary">
        <SearchBar
          label={"Search"}
          placeholder={"Type to search pages..."}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className=" pt-2">
          Number of found pages:
          {queryResults.length}
        </div>
      </div>

      <article className="container py-6 mx-auto">
        <div className="grid grid-cols-1 mx-4 xl:mx-6 gap-4 justify-self-center">
          {queryResults.map((result) => {
            const fields = new Set<string>()
            Object.keys(result.matchData.metadata).forEach((term) => {
              Object.keys(result.matchData.metadata[term]).forEach((field) => {
                fields.add(field)
              })
            })

            const found = Array.from(fields).map((field, index) => (
              <li
                key={index}
                className="inline mx-px px-3 py-1 mt-1 text-tag whitespace-nowrap font-semibold mr-2 bg-topics"
              >
                {field}
              </li>
            ))
            const item = (
              <React.Fragment key={result.ref}>
                <div className="px-2 py-4 overflow-hidden bg-white border border-gray-200 rounded-md shadow-md h-full flex flex-col">
                  <h2 className="capitalize">
                    {db[result.ref].question || db[result.ref].slug}
                  </h2>
                  <ul className="mt-4">
                    <h2 className="font-sans text-black text-tag mb-1 font-extrabold">
                      Match found in:
                    </h2>
                    {found}
                  </ul>
                  <h2 className="pt-3 mt-4 border-t-2 border-solid">
                    <a className="btn-wide" href={`${siteUrl}/${result.ref}`}>
                      View Page
                    </a>
                  </h2>
                </div>
              </React.Fragment>
            )
            return item
          })}
        </div>
        <div className="">
          {queryResults.length == 0 && (
            <section>
              <h2>No Results</h2>
            </section>
          )}
        </div>
      </article>
    </div>
  )
}
