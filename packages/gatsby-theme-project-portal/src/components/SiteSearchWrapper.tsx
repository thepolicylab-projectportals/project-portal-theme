import React, { FunctionComponent, useEffect, useState } from "react"
import lunr from "lunr"
import SiteSearch from "./SiteSearch"

export interface SearchWrapperProps {
  siteUrl: string
  index?: lunr.Index
  dataBase?: Function
}

export const SearchWrapper: FunctionComponent<SearchWrapperProps> = ({
  siteUrl,
  index,
  dataBase,
}: SearchWrapperProps) => {
  const [idx, setIdx] = useState()
  const [db, setDb] = useState()
  useEffect(() => {
    const getIndex = async () => {
      const savedIndex = await (await fetch("/lunr-index.json")).json()
      const documents = await (await fetch("/documents.json")).json()

      setIdx(lunr.Index.load(savedIndex))
      // this is a function which grabs the slug from the original documents
      // lunr tosses this info for SPEED
      setDb(
        documents.reduce(function (acc, document) {
          acc[document.slug] = document
          return acc
        }, {})
      )
    }

    // Because Gatsby runs this on build, we need to say to ignore getting the json files
    // if the window is undefined (not running in the browser)
    // see: https://www.gatsbyjs.com/docs/debugging-html-builds/
    if (typeof window !== `undefined`) getIndex().catch(console.error)
  }, [])

  return <div>{<SiteSearch siteUrl={siteUrl} index={idx} db={db} />}</div>
}
export default SearchWrapper
