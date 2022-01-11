import React from "react"
import { Link } from "gatsby"

export const Footer = () => {
  return (
    <footer className="flex flex-wrap justify-between w-full px-2 py-8 bg-primary-500 xl:container xl:px-12">
      <div className="block w-full lg:w-auto">
        <a href="https://www.sanantonio.gov/">
          <img
            className="inline-block"
            src="/images/sa-logo.png"
            alt="San Antonio Logo"
          />
          <p className="inline-block ml-4 text-lg font-bold text-white">
            City of San Antonio
          </p>
        </a>
      </div>
      <div className="mt-6 lg:my-auto">
        <ul className="text-sm font-bold text-white list-none">
          <ListItem target={"http://www.sanantonio.gov/Equity.aspx"}>
            Office of Equity
          </ListItem>
          <ListItem target={"http://www.sanantonio.gov/ada/"}>
            ADA Compliance
          </ListItem>
          <ListItem target={"http://www.sanantonio.gov/opengovernment/"}>
            Open Records
          </ListItem>
          <ListItem target={"http://www.sanantonio.gov/disclaimer.aspx"}>
            Privacy Policy and Disclaimer
          </ListItem>
          <ListItem target={"https://www.sanantonio.gov/"}>
            sanantonio.gov
          </ListItem>
        </ul>
      </div>
    </footer>
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
