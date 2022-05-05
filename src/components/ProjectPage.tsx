import React, { useState, useEffect, useRef } from "react"
import { Cards, CardProps } from "../components"
import { Layout } from "../layouts/Layout"
import { HeaderWithImage } from "./HeaderWithImage"
import { Pagination } from "./Pagination"
import { GatsbyImage } from "gatsby-plugin-image"
import BackIcon from "./BackIcon.tsx"
import ForwardIcon from "./ForwardIcon.tsx"
import Select from "react-select"

function customSort(dateField, sortDescending) {
  return function (a, b) {
    let sortValue = 0
    const aValue = a.data[dateField]
    const bValue = b.data[dateField]

    // equal items sort equally
    if (aValue === bValue) {
      sortValue = 0
    }
    // nulls sort after anything else
    else if (aValue === null) {
      sortValue = 1
    } else if (bValue === null) {
      sortValue = -1
    }
    // otherwise, if we're descending
    else {
      sortValue = aValue > bValue ? -1 : 1
    }

    if (!sortDescending) {
      sortValue = sortValue * -1
    }

    return sortValue
  }
}
export interface ProjectPageProps {
  title: string
  lede: string
  pageName: string
  dateField: string
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
  dateField,
}: ProjectPageProps) => {
  const ITEMS_PER_PAGE = 6
  const allProjects = data.items.nodes
  const [displayProjects, setDisplayProjects] = useState(data.items.nodes)

  const projectTopics = []

  for (const project of allProjects) {
    for (const topic of project.data.topics) {
      const topicOption = { value: topic, label: topic }
      if (
        !projectTopics.some((existingTopic) => existingTopic.value === topic)
      ) {
        projectTopics.push(topicOption)
      }
    }
  }

  const [sortNewestToOldest, setSortNewestToOldest] = useState(true)

  useEffect(() => {
    //sorting of allProjects based on sortNewestToOldest
    const sortedList = [...displayProjects]
    sortedList.sort(customSort(dateField, sortNewestToOldest))
    setDisplayProjects(sortedList)
  }, [sortNewestToOldest])

  const [pageStart, setPageStart] = useState(0)
  const [pageEnd, setPageEnd] = useState(ITEMS_PER_PAGE)
  //  state for the list
  const [list, setList] = useState([
    ...displayProjects.slice(pageStart, pageEnd),
  ])

  //  state of whether there are prev projects
  const [hasPrev, setHasPrev] = useState(pageStart > 0)
  //  state of whether there are next projects
  const [hasNext, setHasNext] = useState(pageEnd < displayProjects.length)
  const numPages = Math.ceil(displayProjects.length / ITEMS_PER_PAGE)
  const scrollToRef = useRef()

  const handleScroll = () => {
    scrollToRef?.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleLoadNext = () => {
    handleScroll()
    // handle load next button click
    if (hasNext) {
      setPageStart(pageStart + ITEMS_PER_PAGE)
      setPageEnd(pageEnd + ITEMS_PER_PAGE)
    }
  }
  const handleLoadPrev = () => {
    handleScroll()
    // handle load prev button click
    if (hasPrev) {
      setPageStart(pageStart - ITEMS_PER_PAGE)
      setPageEnd(pageEnd - ITEMS_PER_PAGE)
    }
  }

  const handleLoadCustom = (i) => {
    handleScroll()
    const start = i * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    setPageStart(start)
    setPageEnd(end)
  }

  useEffect(() => {
    setList([...displayProjects.slice(pageStart, pageEnd)])
  }, [pageStart, pageEnd, displayProjects])

  useEffect(() => {
    // update if there is a previous page
    setHasPrev(pageStart > 0)
  }, [list]) //  triggered when list is changed

  useEffect(() => {
    //   update if there are more next projects
    setHasNext(pageEnd < displayProjects.length)
  }, [list]) // triggered when list is changed

  const handleSort = (e) => {
    setSortNewestToOldest(e.target.value === "true" ? true : false)
    setPageStart(0)
    setPageEnd(ITEMS_PER_PAGE)
  }

  const [selectedOptions, setSelectedOptions] = useState([])

  const [filterList, setFilterList] = useState(allProjects)
  useEffect(() => {
    handleScroll()
    if (selectedOptions.length == 0) {
      setDisplayProjects(allProjects)
    } else {
      const filteredResults = allProjects.filter(topicFilter)
      setDisplayProjects(filteredResults)
    }
    setPageStart(0)
    setPageEnd(ITEMS_PER_PAGE)
  }, [selectedOptions]) // triggered when list is changed

  function topicFilter(project) {
    for (const topicValue of selectedOptions) {
      if (project.data.topics.includes(topicValue.value)) {
        return true
      }
    }
  }

  return (
    <Layout activePage={pageName} title={title} description={lede}>
      <HeaderWithImage
        title={title}
        imageSrc={data.bgImage.childImageSharp.resize.src}
        lede={lede}
      />
      <div className="relative">
        <div ref={scrollToRef} className="absolute -top-100px"></div>
      </div>
      <div className="pt-4 pb-10 md:mx-8 lg:mt-6 lg:pt-8 lg:pb-20 overflow-hidden px-2 xl:px-12 bg-white">
        <div className="overflow-hidden mb-8 mx-3 xl:mx-6 bg-white">
          <label className="flex flex-wrap font-bold" for="sort">
            Sort by
          </label>
          <select id="sort" value={sortNewestToOldest} onChange={handleSort}>
            <option value={true}>Newest to Oldest</option>
            <option value={false}>Oldest to Newest</option>
          </select>
        </div>
        <div className="mb-8">
          <label className="flex flex-wrap font-bold" for="sort">
            Filter by
          </label>
          <Select
            isMulti={true}
            value={selectedOptions}
            onChange={setSelectedOptions}
            options={projectTopics}
          />
        </div>
        <Cards nodes={list} />
      </div>
      <div className="flex items-center gap-4 justify-center flex-wrap">
        <div className="flex-1 flex justify-end">
          <button
            className={`font-bold pr-4 ${
              hasPrev ? "text-primary" : "text-gray-500 pointer-events-none"
            }`}
            onClick={handleLoadPrev}
          >
            <BackIcon /> Previous
          </button>
        </div>
        <div className="flex items-center gap-4 justify-center">
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
        </div>
        <div className="flex-1 flex justify-start">
          <button
            className={`font-bold pl-4 ${
              hasNext ? "text-primary" : "text-gray-500 pointer-events-none"
            }`}
            onClick={handleLoadNext}
          >
            Next <ForwardIcon />
          </button>
        </div>
      </div>
    </Layout>
  )
}
