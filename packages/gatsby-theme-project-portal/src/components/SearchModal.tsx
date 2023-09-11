import React, { useEffect, useState } from "react"
import { SearchBar } from "./SearchBar"
import * as JsSearch from "js-search"
import { CardProps } from "./Card"
import { graphql } from "gatsby"
import { TopicType } from "./Topics"

export interface ModalProps {
  // Card Details
  slug: string
  title: string
  question: string
  status: string
  agency: string
  topics: TopicType[]

  // Page Details
  data: {
    site: { siteMetadata: { title } }
    generalPage: {
      pageName: string
      title: string
      aims: {
        title: string
        text: string
      }[]
      faq: {
        title: string
        text: string
      }[]
    }
  }
}

export const query = graphql`
  fragment CardDetails on Project {
    slug
    title
    question
    status
    agency
    topics {
      ...TopicDetails
    }
    opportunityCloses
    startDate
    endDate
    lastModified
    created
  }
`
export default function SearchModal() {
  const [showModal, setShowModal] = React.useState(false)
  const [searchQuery, setSearchQuery] = useState([])

  let search = new JsSearch.Search("slug")

  useEffect(() => {
    if (searchQuery.length > 0) {
      search.addDocuments(filteredProjects)
      let searchResults = search.search(searchQuery)
      if (searchResults.length > 0) {
        filteredProjects = searchResults
      }
    }
    //setDisplayProjects will trigger an updated display
  }, [searchQuery])

  return (
    <>
      <button
        className="bg-white text-slate-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Quick Search...
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <SearchBar
                    label={"Search"}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-slate-400 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
