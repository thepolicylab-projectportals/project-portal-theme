import React, { useState, useEffect } from "react"
import { Cards, CardProps } from "../components"
import { Layout } from "../layouts/Layout"
import { HeaderWithImage } from "./HeaderWithImage"
import { Pagination } from "./Pagination"
import { GatsbyImage } from "gatsby-plugin-image"
import BackIcon from "./BackIcon.tsx"
import ForwardIcon from "./ForwardIcon.tsx"

export interface ProjectPageProps {
  title: string
  lede: string
  pageName: string
  data: {
    items: {
      nodes: {
        data: CardProps
      }[]
    }
    bgImage: {
      childImageSharp: {
        resize: {
          src: string
        }
      }
    }
  }
}

export const ProjectPage = ({
  title,
  data,
  lede,
  pageName,
}: ProjectPageProps) => {
  const ITEMS_PER_PAGE = 6
  // array of all projects
  const allProjects = data.items.nodes
  const [pageStart, setPageStart] = useState(0)
  const [pageEnd, setPageEnd] = useState(ITEMS_PER_PAGE)
  //  state for the list
  const [list, setList] = useState([...allProjects.slice(pageStart, pageEnd)])

  //  state of whether there are prev projects
  const [hasPrev, setHasPrev] = useState(pageStart > 0)
  //  state of whether there are next projects
  const [hasNext, setHasNext] = useState(pageEnd < allProjects.length)
  const numPages = Math.ceil(allProjects.length / ITEMS_PER_PAGE)

  const handleLoadNext = () => {
    // handle load next button click
    if (hasNext) {
      setPageStart(pageStart + ITEMS_PER_PAGE)
      setPageEnd(pageEnd + ITEMS_PER_PAGE)
      // For Safari
      document.body.scrollTo(0, 650)
      // For Chrome, Firefox, IE and Opera
      document.documentElement.scrollTo(0, 650)
      //   check if there are more next projects
    }
  }
  const handleLoadPrev = () => {
    // handle load prev button click
    if (hasPrev) {
      setPageStart(pageStart - ITEMS_PER_PAGE)
      setPageEnd(pageEnd - ITEMS_PER_PAGE)
      // For Safari
      document.body.scrollTo(0, 650)
      // For Chrome, Firefox, IE and Opera
      document.documentElement.scrollTo(0, 650)
      //   check if there are more next projects
    }
  }

  const handleLoadCustom = (i) => {
    const start = i * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    setPageStart(start)
    setPageEnd(end)
    // For Safari
    document.body.scrollTo(0, 650)
    // For Chrome, Firefox, IE and Opera
    document.documentElement.scrollTo(0, 650)
    //   check if there are more next projects
  }

  useEffect(() => {
    setList([...allProjects.slice(pageStart, pageEnd)])
  }, [pageStart, pageEnd])

  useEffect(() => {
    // update if there is a previous page
    setHasPrev(pageStart > 0)
  }, [list]) //  triggered when list is changed

  useEffect(() => {
    //   update if there are more next projects
    setHasNext(pageEnd < allProjects.length)
  }, [list]) // triggered when list is changed

  return (
    <Layout activePage={pageName} title={title} description={lede}>
      <HeaderWithImage
        title={title}
        imageSrc={data.bgImage.childImageSharp.resize.src}
        lede={lede}
      />
      <Cards nodes={list} />
      <div className="flex items-center gap-4 justify-center flex-wrap">
        <button
          className={`pr-4 ${
            hasPrev ? "text-primary" : "text-gray-500 pointer-events-none"
          }`}
          onClick={handleLoadPrev}
        >
          <BackIcon /> Previous
        </button>
        {Array.from({ length: numPages }, (_, i) => {
          return (
            <button
              className={`${
                pageStart / ITEMS_PER_PAGE === i
                  ? "btn pointer-events-none"
                  : "btn-white"
              } min-w-3rem p-2 border-solid`}
              key={"Page" + i}
              onClick={() => handleLoadCustom(i)}
            >
              {i + 1}
            </button>
          )
        })}
        <button
          className={`pl-4 ${
            hasNext ? "text-primary" : "text-gray-500 pointer-events-none"
          }`}
          onClick={handleLoadNext}
        >
          Next <ForwardIcon />
        </button>
      </div>
    </Layout>
  )
}
