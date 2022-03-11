import { withPrefix } from "gatsby"
import React from "react"
import { MarkdownText } from "../components"
import { Link, useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

interface PaginationProps {
  currentPage: number
  numPages: number
}

export const Pagination = ({ currentPage, numPages }: PaginationProps) => {
  const { back, forward } = useStaticQuery(graphql`
    query {
      back: file(relativePath: { regex: "/^back-arrow.png$/" }) {
        childImageSharp {
          gatsbyImageData(width: 8)
        }
      }
      forward: file(relativePath: { regex: "/^forward-arrow.png$/" }) {
        childImageSharp {
          gatsbyImageData(width: 8)
        }
      }
    }
  `)
  const back_arrow = getImage(back)
  const forward_arrow = getImage(forward)
  console.log(numPages)
  console.log("aint no way")
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
      <Link className="text-primary pr-4" to={prevPagePath} rel="prev">
        <GatsbyImage
          className="inline-block mt-1.5 mr-1"
          image={back_arrow}
          alt="back arrow"
        />
        Previous
      </Link>
      {Array.from({ length: numPages }, (_, i) => {
        console.log(i)
        let buttonClass = "btn-white"
        if (currentPage === i + 1) {
          buttonClass = "btn"
        }
        return (
          <Link className="" key={i + 1} to={getPageNumberPath(i)}>
            <button className={buttonClass}>{i + 1}</button>
          </Link>
        )
      })}
      <Link className="text-primary pl-4" to={nextPagePath} rel="next">
        {" "}
        Next
        <GatsbyImage
          className="inline-block mt-1.5 ml-1"
          image={forward_arrow}
          alt="forward arrow"
        />
      </Link>
    </div>
  )
}
