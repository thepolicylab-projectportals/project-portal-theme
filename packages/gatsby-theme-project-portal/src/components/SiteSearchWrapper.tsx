import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { graphql, useStaticQuery } from "gatsby"
import SiteSearch from "./SiteSearch"
import { createSearchIndex } from "../utils"

export interface SearchWrapperProps {
  siteUrl: string
}
const siteSearchQuery = graphql`
  query searchNodes {
    allProject {
      nodes {
        slug
        question
        title
        summary
        status
        opportunityCloses
        startDate
        endDate
        lastModified
        agency
        topics {
          ...TopicDetails
        }
        deliverable
        purpose
        expertise
        requirement
        keyDates
        priorResearch
        statusOfData
        fundingInfo
        emailContent
        mainContact {
          name
          title
          employer
          email
        }
        projectTeam {
          name
          title
          employer
          email
        }
        faq {
          text
          title
        }
      }
    }
    allGeneralPage {
      nodes {
        slug
        lede
        faq {
          text
          title
        }
        aims {
          text
          title
        }
        title
      }
    }
  }
`

export const SearchWrapper: FunctionComponent<SearchWrapperProps> = ({
  siteUrl,
}: SearchWrapperProps) => {
  console.log("search page has loaded")

  // const queryData = useMemo(() => {
  //   const data = useStaticQuery(siteSearchQuery)
  //   return { ...data, siteUrl }
  // }, [siteSearchQuery, siteUrl])
  // const searchIndex = useMemo(() => createSearchIndex(queryData), [queryData])

  /* this is a function which grabs the slug from the original documents; lunr tosses this info for SPEED
  // const db = documents.reduce(function (acc, document) {
  //   acc[document.slug] = document
  //   return acc
  // }, {})
   */

  // useEffect(() => {
  //   // declare the data fetching function
  //   const fetchData = async () => {
  //     const data = await import("/static/lunrIndex.json")
  //     let index = (lunr.Index.load(JSON.parse(data)))
  //   }
  //
  //   // call the function
  //   fetchData()
  //     // make sure to catch any error
  //     .catch(console.error)
  // }, [])

  return <div>{/*<SiteSearch siteUrl={siteUrl} index={index} db={db} />*/}</div>
}
export default SearchWrapper
