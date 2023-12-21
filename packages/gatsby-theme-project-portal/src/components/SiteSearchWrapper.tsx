import React, { FunctionComponent, useEffect, useState } from "react"
import lunr from "lunr"
import SiteSearch from "./SiteSearch"
import { createSearchIndex } from "../../utils/search.js"
import buildDynamicIndex from "../hooks/search"

export interface SearchWrapperProps {
  siteUrl: string
}

export const SiteSearchWrapper: FunctionComponent<SearchWrapperProps> = ({
  siteUrl,
}: SearchWrapperProps) => {
  const { allProject, allGeneralPage } = buildDynamicIndex()
  const [idx, setIdx] = useState()
  const [db, setDb] = useState()
  useEffect(() => {
    const getIndex = async () => {
      const savedIndex = await (await fetch("/lunr-index.json")).json()
      const db = await (await fetch("/documents-reduced.json")).json()
      try {
        setIdx(lunr.Index.load(savedIndex))
        setDb(db)
      } catch {
        const [index, documents] = createSearchIndex({
          allProject,
          allGeneralPage,
        })
        setIdx(index)
        setDb(
          documents.reduce(function (page, document) {
            page[document.slug] = document
            return page
          }, {})
        )
      }
    }

    // Because Gatsby runs this on build, we need to say to ignore getting the json files
    // if the window is undefined (not running in the browser)
    // see: https://www.gatsbyjs.com/docs/debugging-html-builds/
    if (typeof window !== `undefined`) getIndex().catch(console.error)
  }, [])

  return <div>{<SiteSearch siteUrl={siteUrl} index={idx} db={db} />}</div>
}
