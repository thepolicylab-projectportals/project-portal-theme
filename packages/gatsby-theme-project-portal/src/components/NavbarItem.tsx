import React, { FunctionComponent } from "react"
import { Link } from "gatsby"

interface NavbarItemProps {
  name: string
  link?: string
  isActive: boolean
}

export const NavbarItem: FunctionComponent<NavbarItemProps> = ({
  name,
  link,
  isActive,
}) => {
  return (
    <>
      <li className="nav-item">
        <span className="flex items-center p-5 leading-snug text-white hover:opacity-75 xl:text-black xl:px-3 xl:py-2">
          <Link to={link ? link : "#"}>
            {isActive ? (
              <span className="text-nav pb-1 ml-2 font-bold border-b-2 border-white xl:border-primary">
                {name}
              </span>
            ) : (
              <span className="text-nav pb-1 ml-2 border-b-2 hover:border-primary xl:border-transparent">
                {name}
              </span>
            )}
          </Link>
        </span>
      </li>
    </>
  )
}
