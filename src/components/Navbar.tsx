import React, { FunctionComponent } from "react"
import { Link, withPrefix } from "gatsby"
import { FaBars, FaTimes } from "react-icons/fa"

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
        <span className="flex items-center p-5 font-bold leading-snug text-black text-white hover:opacity-75 xl:text-black xl:px-3 xl:py-2">
          <Link to={link ? link : "#pablo"}>
            {isActive ? (
              <span className="pb-1 ml-2 border-b-4 border-white xl:border-rust-500">
                {name}
              </span>
            ) : (
              <span className="ml-2">{name}</span>
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
  return (
    <>
      <nav
        id="nav-bar"
        className={
          "sticky top-0 flex flex-wrap items-center justify-between w-full p-0 bg-gray-100 xl:relative xl:px-2 xl:py-6 overflow-hidden"
        }
      >
        <div className="flex flex-wrap justify-between w-full px-0 xl:px-4">
          <div className="relative flex flex-no-wrap w-full xl:static xl:block xl:w-auto">
            <button
              className="block p-6 ml-0 text-xl leading-none text-white outline-none cursor-pointer bg-rust-500 xl:hidden focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {navbarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <Link
              className="block mx-4 my-auto overflow-hidden text-lg font-bold text-black align-middle whitespace-nowrap"
              to="/"
            >
              <img
                className="hidden xl:inline-block"
                src={withPrefix("images/sa-logo.png")}
                alt={"Logo"}
              />
              San Antonio Research Partnership Portal
            </Link>
          </div>
          <div
            className={
              "sticky top-16 xl:relative xl:top-0 flex-grow items-center bg-rust-500 xl:bg-transparent xl:flex xl:bg-gray-100 z-10 xl:z-0 transition-transform" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col list-none xl:flex-row xl:ml-auto">
              <NavbarItem
                name="Open opportunities"
                link="/"
                isActive={activePage == "open"}
              />
              <NavbarItem
                name="In-progress projects"
                link="/in-progress"
                isActive={activePage == "in-progress"}
              />
              <NavbarItem
                name="Completed projects"
                link="/completed"
                isActive={activePage == "completed"}
              />
              <NavbarItem
                name="About"
                link="/about"
                isActive={activePage == "about"}
              />
              <NavbarItem
                name="Contact"
                link="/contact"
                isActive={activePage == "contact"}
              />
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
