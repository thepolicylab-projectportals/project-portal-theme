import React from "react"
import { Link } from "gatsby"

export const Footer = () => {
  return (
    <div
      className={
        "bg-rust-500 w-full xl:container px-2 py-8 xl:px-12 flex flex-wrap justify-between"
      }
    >
      <div className={"block w-full lg:w-auto"}>
        <a href="https://www.sanantonio.gov/">
          <img className={"inline-block"} src="/images/sa-logo.png" />
          <h3 className={"inline-block text-white text-lg ml-4 font-bold"}>
            City of San Antonio
          </h3>
        </a>
      </div>
      <div className={"mt-6 lg:my-auto"}>
        <ul className={"list-none text-white text-sm font-bold"}>
          <ListItem target={"/#"}>Employer Directory</ListItem>
          <ListItem target={"/#"}>Accessibility</ListItem>
          <ListItem target={"/#"}>Term of use</ListItem>
          <ListItem target={"/#"}>Privacy</ListItem>
        </ul>
      </div>
    </div>
  )
}

const ListItem = ({ target, children }) => {
  return (
    <>
      <li className="block px-4 py-2 lg:inline-block lg:ml-6">
        <Link to={target}>{children}</Link>
      </li>
    </>
  )
}
