import React, { FunctionComponent } from "react"
import { Card, CardWithoutNavigationProps } from "./Card"

export interface CardsProps {
  nodes: CardWithoutNavigationProps[]
}

export const Cards: FunctionComponent<CardsProps> = ({ nodes }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-3 xl:mx-6 gap-4 justify-self-center">
      {nodes.map((item, i) => (
        <Card
          key={"card_" + item.slug}
          {...item}
          navigation={{
            current: i,
            items: nodes.map((item) => `/${item.slug}`),
          }}
        />
      ))}
    </div>
  )
}
