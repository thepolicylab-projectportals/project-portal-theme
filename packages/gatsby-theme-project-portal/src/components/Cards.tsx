import React, { FunctionComponent } from "react"
import { Card, CardProps } from "./Card"
import { Link } from "gatsby"

export interface CardsProps {
  nodes: CardProps[]
}

export const Cards: FunctionComponent<CardsProps> = ({ nodes }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-3 xl:mx-6 gap-4 justify-self-center">
      {nodes.map((item, i) => (
        <article key={"card_" + item.slug}>
          <Link
            to={`/project/${item.slug}`}
            state={{
              current: i,
              items: nodes.map((item) => `/${item.slug}`),
            }}
          >
            <Card {...item} />
          </Link>
        </article>
      ))}
    </div>
  )
}
