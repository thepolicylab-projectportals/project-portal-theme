import React, { useState, useEffect, useRef } from "react"
import { Cards, CardProps } from "../components"
import { HeaderWithImage } from "./HeaderWithImage"
import { BackIcon } from "./BackIcon"
import { ForwardIcon } from "./ForwardIcon"
import Select from "react-select"
import { isNA } from "../utils"

function customSort(dateField: string, sortAscending: boolean) {
  return function (a, b) {
    let sortValue
    const aValue = a[dateField]
    const bValue = b[dateField]

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

    if (sortAscending) {
      sortValue = sortValue * -1
    }

    return sortValue
  }
}
export interface ProjectPageProps {
  title: string
  lede: string
  sortOptions: [...any]
  allProjects: CardProps[]
  bgImage: string
}

export const ProjectPage = ({
  title,
  allProjects,
  lede,
  sortOptions,
  bgImage,
}: ProjectPageProps) => {
  const ITEMS_PER_PAGE = 6
  const [sortedProjects, setSortedProjects] = useState(allProjects)
  const [displayProjects, setDisplayProjects] = useState(allProjects)

  const projectTopics = []

  for (const project of allProjects) {
    if (project.topics) {
      for (const topic of project.topics) {
        if (!projectTopics.some(({ value }) => value === topic)) {
          projectTopics.push({ value: topic, label: topic })
        }
      }
    }
  }

  const projectStatus = new Map()
  projectStatus.set("created", "Date Posted")
  projectStatus.set("opportunityCloses", "Opportunity Closes")
  projectStatus.set("startDate", "Project Started")
  projectStatus.set("endDate", "Project Ended")

  var sortingOptions = []
  var index = 1
  var sortDirections = [
    { direction: "Newest to Oldest", sortAscending: false },
    { direction: "Oldest to Newest", sortAscending: true },
  ]
  for (const sortOption of sortOptions) {
    const project_status = projectStatus.get(sortOption)

    for (const direction of sortDirections) {
      const newSortOption = {
        value: index,
        label: project_status + ": " + direction.direction,
        field: sortOption,
        sortAscending: direction.sortAscending,
      }
      sortingOptions.push(newSortOption)
      index++
    }
  }

  const [sortDirection, setSortDirection] = useState(sortingOptions[0])

  useEffect(() => {
    const sortedList = [...allProjects]
    sortedList.sort(
      customSort(sortDirection.field, sortDirection.sortAscending)
    )
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
          project.topics.some((topic) => filteredTopics.includes(topic))
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
    <>
      <header>
        <HeaderWithImage title={title} imageSrc={bgImage} lede={lede} />
      </header>
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
              options={sortingOptions}
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
        <div className="sr-only">
          Total Results: {displayProjects.length} Projects
        </div>
        <Cards nodes={list} />
      </div>
      {!(isNA(hasPrev) && isNA(hasNext)) && (
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
      )}
    </>
  )
}
