import React, { useState, useEffect } from "react"
import { Cards, CardProps } from "../components"
import { Layout } from "../layouts/Layout"
import { HeaderWithImage } from "./HeaderWithImage"
import { Pagination } from "./Pagination"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

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
  const allNews = data.items.nodes // ARRAY OF ALL PROJECTS
  const [pageStart, setPageStart] = useState(0)
  const [pageEnd, setPageEnd] = useState(6)
  const [list, setList] = useState([...allNews.slice(0, 6)]) //  STATE FOR THE LIST

  const [loadPrev, setLoadPrev] = useState(false) //     STATE TO TRIGGER PREV POSTS
  const [loadNext, setLoadNext] = useState(false) //     STATE TO TRIGGER NEXT POSTS
  const [hasPrev, setHasPrev] = useState(pageStart > 0) //  STATE OF WHETHER THERE ARE PREV POSTS
  const [hasNext, setHasNext] = useState(pageEnd < allNews.length) //  STATE OF WHETHER THERE ARE NEXT POSTS

  const handleLoadNext = () => {
    // HANDLE LOAD NEXT BUTTON CLICK
    setLoadNext(true)
  }
  const handleLoadPrev = () => {
    // HANDLE LOAD PREV BUTTON CLICK
    setLoadPrev(true)
  }

  useEffect(() => {
    //  HANDLE LOADING THE PREV POSTS
    if (loadPrev && hasPrev) {
      const isMore = pageStart > 0
      if (isMore) {
        setPageStart(pageStart - 6) //UPDATE START/END BEFORE UPDATING LIST
        setPageEnd(pageEnd - 6)
        setList([...allNews.slice(pageStart - 6, pageEnd - 6)])
      }
      setLoadPrev(false)
    }
  }, [loadPrev, hasPrev])
  useEffect(() => {
    //  HANDLE LOADING THE NEXT POSTS
    if (loadNext && hasNext) {
      const isMore = pageEnd < allNews.length
      if (isMore) {
        setPageStart(pageStart + 6)
        setPageEnd(pageEnd + 6)
        setList([...allNews.slice(pageStart + 6, pageEnd + 6)])
      }
      setLoadNext(false)
    }
  }, [loadNext, hasNext])

  useEffect(() => {
    //    CHECK IF THERE ARE MORE NEXT POSTS
    const isMore = pageStart > 0
    setHasPrev(isMore)
  }, [list]) //   TRIGGERED WHEN LIST IS CHANGED
  useEffect(() => {
    //    CHECK IF THERE ARE MORE NEXT POSTS
    const isMore = pageEnd < allNews.length
    setHasNext(isMore)
  }, [list]) //   TRIGGERED WHEN LIST IS CHANGED

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

  return (
    <Layout activePage={pageName} title={title} description={lede}>
      <HeaderWithImage
        title={title}
        imageSrc={data.bgImage.childImageSharp.resize.src}
        lede={lede}
      />
      <Cards nodes={list} />
      <div className="flex items-center gap-4 justify-center flex-wrap">
        {hasPrev ? (
          <button className="text-primary pr-4" onClick={handleLoadPrev}>
            <GatsbyImage
              className="inline-block mt-1.5 mr-1"
              image={back_arrow}
              alt="back arrow"
            />
            Prev
          </button>
        ) : (
          <button
            className="text-primary pr-4 pointer-events-none"
            onClick={handleLoadPrev}
          >
            <GatsbyImage
              className="inline-block mt-1.5 mr-1"
              image={back_arrow}
              alt="back arrow"
            />
            Prev
          </button>
        )}

        {hasNext ? (
          <button className="text-primary pr-4" onClick={handleLoadNext}>
            Next
            <GatsbyImage
              className="inline-block mt-1.5 ml-1"
              image={forward_arrow}
              alt="forward arrow"
            />
          </button>
        ) : (
          <button
            className="text-primary pr-4 pointer-events-none"
            onClick={handleLoadNext}
          >
            Next
            <GatsbyImage
              className="inline-block mt-1.5 ml-1"
              image={forward_arrow}
              alt="forward arrow"
            />
          </button>
        )}
      </div>
    </Layout>
  )
}
