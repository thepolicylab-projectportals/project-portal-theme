import React, { FunctionComponent } from "react"
import { Link } from "gatsby"
import { FaBars, FaTimes } from "react-icons/fa"
import { ImageDataLike } from "gatsby-plugin-image"
import { SiteTitle, NavbarItem } from "."

interface NavbarProps {
  title: string
  activePage?: string
  image?: ImageDataLike
  pages: {
    name: string
    link: string
    show: boolean
  }[]
}

export const Navbar: FunctionComponent<NavbarProps> = ({
  title,
  activePage,
  image,
  pages,
}: NavbarProps) => {
  const [navbarOpen, setNavbarOpen] = React.useState(false)
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
              className="block mx-4 my-auto overflow-hidden text-nav text-black font-bold flex gap-4 items-center whitespace-nowrap"
              to="/"
            >
              <SiteTitle image={image} title={title} />
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
              {pages.map(({ name, link, show }, i) =>
                show ? (
                  <Link
                    to={link ? link : "#"}
                    onClick={() => setNavbarOpen(false)}
                  >
                    <NavbarItem
                      key={"nav" + i}
                      name={name}
                      isActive={activePage === link}
                    />
                  </Link>
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
