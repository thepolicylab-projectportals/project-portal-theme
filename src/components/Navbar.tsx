import React, { FunctionComponent } from "react"
import { Link } from "gatsby"
import { FaBars } from "react-icons/fa"

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
        <span className="px-3 py-2 flex items-center text-md font-bold leading-snug text-black hover:opacity-75">
          <Link to={link ? link : "#pablo"}>
            {isActive ? (
              <span className="ml-2 border-b-4 pb-1 border-rust-500">
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
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-6 bg-gray-100">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-black"
              to="/"
            >
              Logo Ipsum
            </Link>
            <button
              className="text-black cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FaBars />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
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
