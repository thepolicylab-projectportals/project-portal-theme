import React, { FunctionComponent } from "react"
import { Link } from "gatsby"
import { FaBars, FaTimes } from "react-icons/fa"
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image"
import { isLocalLink } from "../utils/is-external-link"

export interface NavbarProps {
  title?: string
  activePage?: string
  image?: ImageDataLike
  pages?: {
    name: string
    link: string
    show: boolean
  }[]
}

export const ActivePageNavItem: FunctionComponent<{ name }> = ({ name }) => {
  return (
    <li className="nav-item">
      <span className="flex items-center p-5 leading-snug text-white hover:opacity-75 xl:text-black xl:px-3 xl:py-2">
        <span className="text-nav ml-2 font-bold border-b-2 border-white xl:border-primary">
          {name}
        </span>
      </span>
    </li>
  )
}

export const InactivePageNavItem: FunctionComponent<{ name }> = ({ name }) => {
  return (
    <li className="nav-item">
      <span className="flex items-center p-5 leading-snug text-white hover:opacity-75 xl:text-black xl:px-3 xl:py-2">
        <span className="text-nav ml-2 border-b-2 hover:border-primary border-transparent">
          {name}
        </span>
      </span>
    </li>
  )
}

export const ExternalLinkSymbol = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    {...props}
  >
    <path d="M6 1h5v5L8.86 3.85 4.7 8 4 7.3l4.15-4.16L6 1Z M2 3h2v1H2v6h6V8h1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
  </svg>
)

export const ExternalPageNavItem: FunctionComponent<{ name }> = ({ name }) => {
  return (
    <li className="nav-item">
      <span className="flex items-center p-5 leading-snug text-white hover:opacity-75 xl:text-black xl:px-3 xl:py-2">
        <span className="text-nav ml-2 border-b-2 hover:border-primary border-transparent">
          {name}
        </span>
        <ExternalLinkSymbol className="inline ml-1 -mr-3 fill-white xl:fill-black" />
      </span>
    </li>
  )
}

export const Navbar: FunctionComponent<NavbarProps> = ({
  title,
  activePage,
  image,
  pages,
}: NavbarProps) => {
  const [navbarOpen, setNavbarOpen] = React.useState(false)
  const resolvedImage = getImage(image)
  return (
    <>
      <nav
        id="nav-bar"
        className={
          "sticky top-0 flex flex-wrap items-center justify-between w-full p-0 bg-navbar xl:relative xl:px-2 xl:py-6 overflow-y-visible z-10"
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
              className="block xl:min-h-full mx-4 my-3 xl:my-auto overflow-hidden text-nav text-black font-bold flex gap-4 items-center whitespace-nowrap"
              to="/"
            >
              {resolvedImage ? (
                <GatsbyImage
                  className="xl:inline-block logotype"
                  image={resolvedImage}
                  alt={"nav_logo"}
                />
              ) : (
                <></>
              )}
              <div>{title}</div>
            </Link>
          </div>
          <div
            className={
              "absolute top-16 w-full md:w-2/3 xl:w-auto xl:relative xl:top-0 flex-grow items-center bg-primary xl:bg-transparent xl:flex xl:bg-navbar z-10 xl:z-0 transition-transform drop-shadow-lg filter xl:drop-shadow-none" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col list-none xl:flex-row xl:ml-auto">
              {pages
                ?.filter((e) => e.show)
                .map(({ name, link }, i) => (
                  <>
                    {isLocalLink(link) ? (
                      <Link
                        key={"nav" + i}
                        to={link ? link : "#"}
                        onClick={() => setNavbarOpen(false)}
                      >
                        {activePage === link ? (
                          <ActivePageNavItem name={name} />
                        ) : (
                          <InactivePageNavItem name={name} />
                        )}
                      </Link>
                    ) : (
                      <a
                        key={"nav" + i}
                        href={link}
                        onClick={() => setNavbarOpen(false)}
                      >
                        <ExternalPageNavItem name={name} />
                      </a>
                    )}
                  </>
                ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
