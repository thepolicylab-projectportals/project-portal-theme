import React, { FunctionComponent } from "react"
import { Link, withPrefix, useStaticQuery, graphql } from "gatsby"
import { FaBars, FaTimes } from "react-icons/fa"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import meta from "site/meta.json"

interface NavbarItemProps {
  name: string
  link?: string
  isActive: boolean
}

const NavbarItem: FunctionComponent<NavbarItemProps> = ({
  name,
  link,
  isActive,
}) => {
  return (
    <>
      <li className="nav-item">
        <span className="flex items-center p-5 leading-snug text-white hover:opacity-75 xl:text-black xl:px-3 xl:py-2">
          <Link to={link ? link : "#pablo"}>
            {isActive ? (
              <span className="text-nav pb-1 ml-2 font-bold border-b-2 border-white xl:border-primary">
                {name}
              </span>
            ) : (
              <span className="text-nav ml-2">{name}</span>
            )}
          </Link>
        </span>
      </li>
    </>
  )
}

interface NavbarProps {
  activePage: string
}

export const Navbar: FunctionComponent<NavbarProps> = ({
  activePage,
}: NavbarProps) => {
  const [navbarOpen, setNavbarOpen] = React.useState(false)
  const {
    site: {
      siteMetadata: { title, pages },
    },
    logo,
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          pages {
            name
            link
            show
          }
        }
      }
      logo: file(relativePath: { regex: "/^logo.png$/" }) {
        childImageSharp {
          gatsbyImageData(width: 88)
        }
      }
    }
  `)

  const image = getImage(logo)

  return (
    <>
      <nav
        id="nav-bar"
        className={
          "sticky top-0 flex flex-wrap items-center justify-between w-full p-0 bg-navbar xl:relative xl:px-2 xl:py-6 overflow-hidden z-10"
        }
      >
        <div className="flex flex-wrap justify-between w-full px-0 xl:px-4">
          <div className="relative flex flex-no-wrap w-full xl:static xl:block xl:w-auto">
            <button
              className="block p-6 ml-0 text-xl leading-none text-white outline-none cursor-pointer bg-primary xl:hidden focus:outline-none"
              type="button"
              aria-label="Open navigation menu"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {navbarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <Link
              className="block mx-4 my-auto overflow-hidden text-h4 text-black flex items-center whitespace-nowrap"
              to="/"
            >
              <GatsbyImage
                className="hidden xl:inline-block"
                image={image}
                alt={meta.title + " logo"}
              />
              {title}
            </Link>
          </div>
          <div
            className={
              "fixed top-16 w-full md:w-2/3 xl:w-auto xl:relative xl:top-0 flex-grow items-center bg-primary xl:bg-transparent xl:flex xl:bg-navbar z-10 xl:z-0 transition-transform drop-shadow-lg filter xl:drop-shadow-none" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col list-none xl:flex-row xl:ml-auto">
              {pages.map(({ name, link, show }, i) =>
                show ? (
                  <NavbarItem
                    key={"nav" + i}
                    name={name}
                    link={link}
                    isActive={activePage === name}
                  />
                ) : (
                  ""
                )
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
