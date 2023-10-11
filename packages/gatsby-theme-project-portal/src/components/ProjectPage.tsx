import React, { useState, useEffect, useRef } from "react"
import { Cards, CardProps } from "../components"
import { HeaderWithImage } from "./HeaderWithImage"
import { BackIcon } from "./BackIcon"
import { ForwardIcon } from "./ForwardIcon"
import Select, { MultiValue } from "react-select"
import * as JsSearch from "js-search"
import { SearchBar } from "./SearchBar"
import { ImageDataLike } from "gatsby-plugin-image"

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
  image: ImageDataLike
}

export const ProjectPage = ({
  title,
  allProjects,
  lede,
  sortOptions,
  image,
}: ProjectPageProps) => {
  const getTopics = (project: CardProps[]): CardProps[] => {
    let tempFilterOptions = []
    for (const tempProject of project) {
      if (tempProject.topics) {
        for (const topic of tempProject.topics) {
          if (!tempFilterOptions.some(({ value }) => value === topic.slug)) {
            tempFilterOptions.push({ value: topic.slug, label: topic.title })
          }
        }
      }
    }
    return tempFilterOptions
  }
  const getStatus = (project: CardProps[]): CardProps[] => {
    let tempStatus = []
    for (const tempProject of project) {
      if (tempProject.status) {
        if (!tempStatus.some(({ value }) => value === tempProject.status)) {
          tempStatus.push({
            value: tempProject.status,
            label: tempProject.status,
          })
        }
      }
    }
    return tempStatus
  }
  const [filterOptionsTopic, setFilterOptionsTopic] = useState(
    getTopics(allProjects)
  )
  const [filterOptionsStatus, setFilterOptionsStatus] = useState(
    getStatus(allProjects)
  )

  const ITEMS_PER_PAGE = 6
  const [sortedProjects, setSortedProjects] = useState(allProjects)
  const [displayProjects, setDisplayProjects] = useState(allProjects)

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
  const scrollToRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    scrollToRef?.current?.scrollIntoView({ behavior: "smooth" })
  }

  const [searchQuery, setSearchQuery] = useState([])

  let search = new JsSearch.Search("slug")
  search.addIndex("topicNames")
  search.addIndex("question")
  search.addIndex("agency")

  const flattenTopics = (project: CardProps): any => {
    let result = []
    //creating new array of all topicNames associated
    //with this project
    for (let i = 0; i < project.topics.length; i++) {
      result.push(project.topics[i].title)
    }
    return result
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

  const [selectedTopicOptions, setSelectedTopicOptions] = useState<
    MultiValue<any>
  >([])
  const [selectedStatusOptions, setSelectedStatusOptions] = useState<
    MultiValue<any>
  >([])

  useEffect(() => {
    const sortedList = [...allProjects]
    sortedList.sort(
      customSort(sortDirection.field, sortDirection.sortAscending)
    )
    setSortedProjects(sortedList)
    setPageStart(0)
    setPageEnd(ITEMS_PER_PAGE)
  }, [sortDirection])

  useEffect(() => {
    //consolidate what displayProjects will look like
    //after 3 checks in following order:
    //1. Sort by  **Done in other useEffect**
    //2. Filter by topic
    //3. Search query

    let filteredProjects = sortedProjects

    //2. filter by topic. If there are any filters chosen
    // apply it to filteredProjects
    // or else stick with sortedProjects (which may have been updated by sortOptions) aka the first check
    if (selectedTopicOptions.length > 0) {
      const filteredTopics = selectedTopicOptions.map(({ value }) => value)
      filteredProjects = sortedProjects.filter((project) =>
        project.topics
          .map((topic) => topic.slug)
          .some((topicSlug) => filteredTopics.includes(topicSlug))
      )
    }
    setPageStart(0)
    setPageEnd(ITEMS_PER_PAGE)

    // 3. filter by status. If there are any filters chosen
    // apply it to filteredProjects
    if (selectedStatusOptions.length > 0) {
      const filteredStatus = selectedStatusOptions.map(({ value }) => value)
      filteredProjects = sortedProjects.filter((project) =>
        filteredStatus.includes(project.status)
      )
    }
    //4. search query
    // if search query is used, we will now apply search results, to filteredProjects
    if (searchQuery.length > 0) {
      for (let i = 0; i < filteredProjects.length; i++) {
        filteredProjects[i]["topicNames"] = flattenTopics(filteredProjects[i])
      }
      search.addDocuments(filteredProjects)
      let searchResults = search.search(searchQuery)
      if (searchResults.length > 0) {
        filteredProjects = searchResults
      }
    }

    setFilterOptionsTopic(getTopics(filteredProjects))
    setFilterOptionsStatus(getStatus(filteredProjects))
    //now filteredProjects has gone through all 3 checks
    //ready to update displayProjects
    setDisplayProjects(filteredProjects)
    //setDisplayProjects will trigger an updated display
  }, [selectedTopicOptions, selectedStatusOptions, sortedProjects, searchQuery]) // triggered when list is changed

  const selectStyle = {
    placeholder: (provided) => ({ ...provided, color: "#767676" }),
  }

  return (
    <>
      <header>
        <HeaderWithImage title={title} image={image} lede={lede} />
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
              Filter by status
            </label>
            <Select
              aria-labelledby="filter-label"
              inputId="filter"
              name="filter-select"
              isMulti={true}
              value={selectedStatusOptions}
              onChange={setSelectedStatusOptions}
              options={filterOptionsStatus}
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
              value={selectedTopicOptions}
              onChange={setSelectedTopicOptions}
              options={filterOptionsTopic}
              styles={selectStyle}
              noOptionsMessage={() => "No remaining topics"}
            />
          </div>
          <div className="flex-1 min-w-30ch auto-rows-auto flex flex-col">
            <SearchBar
              label={"Search"}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="sr-only">
          Total Results: {displayProjects.length} Projects
        </div>
        <Cards nodes={list} />
      </div>
      {!(hasPrev == null && hasNext == null) && (
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
