import { withPrefix } from "gatsby"
import React from "react"
import { MarkdownText } from "../components"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

interface PaginationProps {
  currentPage: number
  numPages: number
}

export const Pagination = ({ currentPage, numPages }: PaginationProps) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPagePath =
    currentPage - 1 === 1
      ? "/ongoing/"
      : "/ongoing/" + (currentPage - 1).toString()
  const nextPagePath = "/ongoing/" + (currentPage + 1).toString()

  const getPageNumberPath = (currentIndex) => {
    if (currentIndex === 0) {
      return "/ongoing"
    }

    return "/ongoing/" + (currentIndex + 1)
  }

  return (
    <div className="flex items-center gap-4 justify-center flex-wrap">
      <StaticImage class="mt-1 w-2" src="../images/backarrow.png" />
      <Link className="text-primary pr-4" to={prevPagePath} rel="prev">
        &larr; Previous{" "}
      </Link>
      {Array.from({ length: numPages }, (_, i) => {
        return (
          <Link
            className="px-2 border-solid"
            key={i + 1}
            to={getPageNumberPath(i)}
          >
            <button className="btn m-responsive">{i + 1}</button>
          </Link>
        )
      })}
      <Link className="text-primary pl-4" to={nextPagePath} rel="next">
        {" "}
        Next &rarr;
      </Link>
    </div>
  )
}
