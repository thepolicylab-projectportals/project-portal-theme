import React, { FunctionComponent } from "react"
import { Link } from "gatsby"
import Icon from "react-icons"
import { FaBars } from "react-icons/fa"

interface NavbarItemProps {
  name: string
  link?: string
}
//

const NavbarItem: FunctionComponent<NavbarItemProps> = ({ name, link }) => {
  return (
    <>
      <li className="nav-item">
        <span className="px-3 py-2 flex items-center text-md font-bold leading-snug text-black hover:opacity-75">
          <Link to={link ? link : "#pablo"}>
            <span className="ml-2">{name}</span>
          </Link>
        </span>
      </li>
    </>
  )
}

interface NavbarProps {}

export const Navbar: FunctionComponent<NavbarProps> = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false)
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gray-100 mb-3">
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
              <NavbarItem name="Open opportunities" link="/" />
              <NavbarItem name="In-progress projects" link="/in-progress" />
              <NavbarItem name="Completed projects" link="/completed" />
              <NavbarItem name="About" link="/about" />
              <NavbarItem name="Contact" />
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
