import React from "react"
import language from "../../language.json"

export const Footer = () => {
  return (
    <footer className="flex flex-wrap justify-between w-full px-2 py-8 bg-rust-500 xl:container xl:px-12">
      <div className="block w-full lg:w-auto">
        <a href={language.footer.heading.link}>
          <img
            className="inline-block"
            src="/images/sa-logo.png"
            alt="San Antonio Logo"
          />
          <p className="inline-block ml-4 text-lg font-bold text-white">
            {language.footer.heading.title}
          </p>
        </a>
      </div>
      <div className="mt-6 lg:my-auto">
        <ul className="text-sm font-bold text-white list-none">
          {language.footer.links.map(({ title, link }, i) => (
            <ListItem key={"link_" + i} target={link}>
              {title}
            </ListItem>
          ))}
        </ul>
      </div>
    </footer>
  )
}

const ListItem = ({ target, children }) => {
  return (
    <>
      <li className="block px-4 py-2 lg:inline-block lg:ml-6">
        <a href={target}>{children}</a>
      </li>
    </>
  )
}
