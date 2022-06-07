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
  const [sortedProjects, setSortedProjects] = useState(allProjects)
  const [displayProjects, setDisplayProjects] = useState(allProjects)

  const projectTopics = []

  for (const project of allProjects) {
    if (project.data.topics) {
      for (const topic of project.data.topics) {
        if (!projectTopics.some(({ value }) => value === topic)) {
          projectTopics.push({ value: topic, label: topic })
        }
      }
    }
  }

  const sortOptions = [
    { value: true, label: "Newest to Oldest" },
    { value: false, label: "Oldest to Newest" },
  ]
  const [sortDirection, setSortDirection] = useState(sortOptions[0])

  useEffect(() => {
    const sortedList = [...allProjects]
    sortedList.sort(customSort(dateField, sortDirection.value))
    setSortedProjects(sortedList)
    setPageStart(0)
    setPageEnd(ITEMS_PER_PAGE)
  }, [sortDirection])

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

  const [selectedOptions, setSelectedOptions] = useState([])

  useEffect(() => {
    if (selectedOptions.length == 0) {
      setDisplayProjects(sortedProjects)
    } else {
      const filteredTopics = selectedOptions.map(({ value }) => value)
      setDisplayProjects(
        sortedProjects.filter((project) =>
          project.data.topics.some((topic) => filteredTopics.includes(topic))
        )
      )
    }
    setPageStart(0)
    setPageEnd(ITEMS_PER_PAGE)
  }, [selectedOptions, sortedProjects]) // triggered when list is changed

  const selectStyle = {
    placeholder: (provided) => ({ ...provided, color: "#767676" }),
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
        <div className="flex flex-wrap gap-4 mb-8 mx-3 xl:mx-6 bg-white">
          <div className="flex-1 min-w-30ch">
            <label id="sort-label" className="font-bold" htmlFor="sort">
              Sort by
            </label>
            <Select
              aria-labelledby="sort-label"
              inputId="sort"
              name="sort-select"
              value={sortDirection}
              onChange={setSortDirection}
              options={sortOptions}
              styles={selectStyle}
            />
          </div>
          <div className="flex-1 min-w-30ch">
            <label id="filter-label" className="font-bold" htmlFor="filter">
              Filter by topic
            </label>
            <Select
              aria-labelledby="filter-label"
              inputId="filter"
              name="filter-select"
              isMulti={true}
              value={selectedOptions}
              onChange={setSelectedOptions}
              options={projectTopics}
              styles={selectStyle}
            />
          </div>
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
