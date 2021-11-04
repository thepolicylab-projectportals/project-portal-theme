import React, { FunctionComponent } from "react"
import { Card, CardProps } from "."

interface CardsProps {
  nodes: {
    data: CardProps
  }[]
}

export const Cards: FunctionComponent<CardsProps> = ({ nodes }) => {
  return (
    <div className="container sm:mt-6 lg:mt-10 overflow-hidden px-16 ng-white">
      <div className="sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 -mx-3 xl:-mx-6">
        {nodes.map((item, i) => (
          <div
            className="w-full sm:w-1/2 xl:w-1/3 px-3 xl:px-6 py-6"
            key={`card_${item.data.slug}`}
          >
            <Card
              {...item.data}
              navigation={{
                current: i,
                items: nodes.map((item) => `/${item.data.slug}`),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
