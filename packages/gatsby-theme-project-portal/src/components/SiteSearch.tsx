import React, { FunctionComponent, useEffect, useState } from "react"
import { SearchBar } from "../components/SearchBar"
import lunr from "lunr"

export interface SearchProps {
  siteUrl: string
  index: lunr.Index
  db: Function
}

export const SiteSearch: FunctionComponent<SearchProps> = ({
  siteUrl,
  index,
  db,
}: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState([])
  const [queryResults, setQueryResults] = useState([])
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (searchQuery.length > 0) {
      // catch the error, and display an error message to help user
      try {
        let searchResults = index.search(searchQuery)
        setQueryResults(searchResults)
        setErrorMessage("")
      } catch (error) {
        if (error instanceof lunr.QueryParseError) {
          setErrorMessage(error.message)
          return
        } else {
          throw error
        }
      }
    } else {
      setQueryResults([])
      setErrorMessage("")
    }
  }, [searchQuery])

  return (
    <div className="flex flex-col items-center justify-center align-middle text-center px-2">
      <div className="container mx-auto mt-4 border-b-4 border-primary">
        <SearchBar
          id="siteSearch"
          autoFocus={true}
          label={"Search"}
          placeholder={"Type to search pages..."}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {errorMessage && (
          <p className="px-4 text-red text-tag font-bold">{errorMessage}</p>
        )}
        <div className="pt-2">
          Number of found pages:
          {queryResults.length}
        </div>
      </div>

      <article className="py-6 container mx-auto">
        <div className="grid grid-cols-1 md:mx-4 xl:mx-6 gap-4 justify-self-center">
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
                <div className="px-2 py-4 overflow-hidden bg-white border border-gray-200 rounded-md shadow-md h-full flex flex-col md:mx-10 md:py-6 lg:mx-60">
                  <h2 className="capitalize">{db[result.ref].title}</h2>
                  <div className="font-sans text-black text-tag my-2 font-extrabold">
                    Match found in:
                  </div>
                  <ul className="grid grid-rows-1 justify-center md:block">
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

export default SiteSearch
